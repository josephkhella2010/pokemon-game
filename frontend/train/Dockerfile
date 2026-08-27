FROM node:latest
WORKDIR /app

COPY . .
    
EXPOSE 3000
    
RUN npm install
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]