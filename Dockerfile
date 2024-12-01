FROM node
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app
RUN npm run build
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
