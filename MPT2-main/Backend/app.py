from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from dotenv import load_dotenv
from supabase import create_client, Client
import psycopg
import os
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials")
if not DATABASE_URL:
    raise ValueError("Missing DATABASE_URL")

logging.info(f"Supabase URL: {SUPABASE_URL}")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
conn = psycopg.connect(DATABASE_URL)

@app.get("/date")
def get_dates():
    data = supabase.table("rain_data").select("Year", "Month", "Day").execute()
    dates = [f"{item['Year']:04d}-{item['Month']:02d}-{item['Day']:02d}" for item in data.data]
    # Optioneel uniek maken
    unique_dates = list(set(dates))
    unique_dates.sort()
    return unique_dates

@app.get("/{table_name}/{item}")
async def get_item(table_name: str, item: str):
    response = supabase.table(table_name).select(item).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail=str("No data found"))
    return response.data

#@app.get("/{item}")
#async def get_data(item: str):
#    url = f"http://host.docker.internal:4000/{item}"
#    async with httpx.AsyncClient() as client:
#        try:
#            response = await client.get(url)
#            response.raise_for_status()
#            return response.json()
#        except httpx.HTTPError as exc:
#            return {"error": f"Kon data niet ophalen: {exc}"}
        

