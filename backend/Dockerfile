    FROM node:latest
    WORKDIR /app

    COPY . .
    
    EXPOSE 5000
    
    RUN npm install
   CMD ["npx", "nodemon", "--legacy-watch", "server.js"]