import { defineStore } from 'pinia';
import axios from 'axios';


export const useDataStore = defineStore('datastore', {
  state: () => ({
    labels: [] as string[],
    ammoniaLevels: [],
    oxygenDemandLevels: [],
    rainLevels: [],
    phLevels: [] as number[],
    naLevels: [] as number[],
    rainlabels: [] as string[],
    loaded: false,
    alerts: [] as any[],
    ammoniaForecast: [] as number[],
    oxygenDemandForecast: [] as number[],
    phForecast: [] as number[],
    naForecast: [] as number[],
    rainForecast: [] as number[],
    forecastlabels: [] as string[],
    forecastLoaded: false,
    forecastrainlabels: [] as string[],
  }),
  actions: {
    async fetchData() {
      if (this.loaded) return; // ← Voorkom dubbele fetch

      try {
        const phLevelsResponse = await fetch(`http://localhost:8000/nutrient_data/PH`);
        const phdata = await phLevelsResponse.json();
        this.phLevels = phdata.map((item: any) => item.PH);

        const nutrientLevelsResponse = await fetch(`http://localhost:8000/nutrient_data/NA`);
        const nadata = await nutrientLevelsResponse.json();
        this.naLevels = nadata.map((item: any) => item.NA);

        const labelsResponse = await fetch(`http://localhost:8000/nutrient_data/DATE`);
        const labeldata = await labelsResponse.json();
        this.labels = labeldata
          .map((item: any) => item.DATE)
          .filter((date: any, index: any, self: any) => self.indexOf(date) === index);

        const ammoniaLevelsResponse = await fetch(`http://localhost:8000/nutrient_data/PO4`);
        const po4data = await ammoniaLevelsResponse.json();
        this.ammoniaLevels = po4data.map((item: any) => item.PO4);

        const oxygenDemandLevelsResponse = await fetch(`http://localhost:8000/nutrient_data/NH4`);
        const nh4data = await oxygenDemandLevelsResponse.json();
        this.oxygenDemandLevels = nh4data.map((item: any) => item.NH4);

        const rainLevelsResponse = await fetch(`http://localhost:8000/rain_data/Rain`);
        const raindata = await rainLevelsResponse.json();
        this.rainLevels = raindata.map((item: any) => item.Rain);

        const rainlabesResponse = await fetch(`http://localhost:8000/date`);
        const rainlabeldata = await rainlabesResponse.json();
        this.rainlabels = rainlabeldata;

        this.loaded = true; // ← markeer als geladen

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
        async fetchForecastData() {
      if (this.forecastLoaded) return; // ← Voorkom dubbele fetch

      try {
        const phLevelsResponse = await fetch(`http://localhost:8000/NutrientForecast/PHForecast`);
        const phdata = await phLevelsResponse.json();
        this.phForecast = phdata.map((item: any) => item.PHForecast);

        const nutrientLevelsResponse = await fetch(`http://localhost:8000/NutrientForecast/NAForecast`);
        const nadata = await nutrientLevelsResponse.json();
        this.naForecast = nadata.map((item: any) => item.NAForecast);

        const labelsResponse = await fetch(`http://localhost:8000/NutrientForecast/ds`);
        const labeldata = await labelsResponse.json();
        this.forecastlabels = labeldata
          .map((item: any) => item.ds)
          .filter((date: any, index: any, self: any) => self.indexOf(date) === index);

        const ammoniaLevelsResponse = await fetch(`http://localhost:8000/NutrientForecast/PO4Forecast`);
        const po4data = await ammoniaLevelsResponse.json();
        this.ammoniaForecast = po4data.map((item: any) => item.PO4Forecast);

        const oxygenDemandLevelsResponse = await fetch(`http://localhost:8000/NutrientForecast/NH4Forecast`);
        const nh4data = await oxygenDemandLevelsResponse.json();
        this.oxygenDemandForecast = nh4data.map((item: any) => item.NH4Forecast);

        const rainLevelsResponse = await fetch(`http://localhost:8000/WeatherForecast/RainForecast`);
        const raindata = await rainLevelsResponse.json();
        this.rainForecast = raindata.map((item: any) => item.RainForecast);

        const rainlabelsResponse = await fetch(`http://localhost:8000/WeatherForecast/ds`);
        const rainlabeldata = await rainlabelsResponse.json();
        this.forecastrainlabels = rainlabeldata
          .map((item: any) => item.ds)
          .filter((date: any, index: any, self: any) => self.indexOf(date) === index);

        // const rainlabesResponse = await fetch(`http://localhost:8000/date`);
        // const rainlabeldata = await rainlabesResponse.json();
        // this.rainlabels = rainlabeldata;

        this.forecastLoaded = true; // ← markeer als geladen

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    resetData() {
      this.loaded = false;
    },
    loadfromLocalStorage() {
      const stored = localStorage.getItem('alerts');
      if (stored) {
        this.alerts = JSON.parse(stored);
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('alerts', JSON.stringify(this.alerts));
    },
    addAlert(alert: { item: string, symbol: string, value: number }) {
      const newId = this.alerts.length + 1;
      const alertWithId = { id: newId, enabled: false, ...alert };
      this.alerts.push(alertWithId);
      this.saveToLocalStorage();
    },
    removeAlertById(id: number) {
      this.alerts = this.alerts.filter(alert => alert.id !== id);
      this.alerts = this.alerts.map((alert, index) => ({
        ...alert,
        id: index + 1,
      }));
      this.saveToLocalStorage();
    },
    toggleAlert(id: number, enabled: boolean) {
      const alert = this.alerts.find(alert => alert.id === id);
      if (alert) {
        alert.enabled = enabled;
        this.saveToLocalStorage();
      }
    },
  },
});

