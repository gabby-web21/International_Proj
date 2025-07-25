# MPT2
## Docker

Before we start make sure you have installed docker desktop and it needs to be running.  

### Only 1 container
To run the frontend in docker you need to do a build and create an image.
By using the next command in the cli you can build the image 'frontend'.  
You need to be in /MPT2/frontend in the terminal to run the command.

```bash
docker build -t frontend .
```

When this is done, you need to run the docker container by using the next command
```bash
docker run -d -p {localport}:80 --name frontend-container frontend
```
Change {localport} by any availlable local port to run this command.  
Once the docker container is up and running, you can go to `localhost:{localport}` in your browser.  

### Docker-compose
If you want to build and run the whole project, you can run de next command in the main folder.  
You need to be in /MPT2 in the terminal to run the command.

```bash
docker compose up --build
```

When you are done with the containers remember to shutdown the containers and delete them with the next command.
```bash
docker compose down -v
```