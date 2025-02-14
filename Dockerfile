# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Leverage caching by installing dependencies first
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code and build for production
COPY . ./
RUN npm run build

# Stage 2: Development environment
FROM node:18-alpine AS development
WORKDIR /app

# Install dependencies again for development
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the full source code
COPY . ./

# Expose port for the development server
EXPOSE 3000
CMD ["npm", "start"]

# Stage 3: Production environment
FROM nginx:alpine AS production
RUN rm /etc/nginx/conf.d/default.conf

# Nginx config file template
COPY ./nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

# Copy scripts
RUN mkdir /scripts
COPY ./nginx/build-config-env.sh /scripts/build-config-env.sh
RUN chmod +x /scripts/build-config-env.sh
COPY ./nginx/configure-nginx.sh /scripts/configure-nginx.sh
RUN chmod +x /scripts/configure-nginx.sh

RUN echo "/scripts/build-config-env.sh > /usr/share/nginx/html/config-env.js" > /scripts/commands.sh
RUN echo "/scripts/configure-nginx.sh" >> /scripts/commands.sh
RUN echo "nginx -g 'daemon off;'"  >> /scripts/commands.sh
RUN chmod +x /scripts/commands.sh

# Copy the production build artifacts from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# NGINX VARIABLES
ENV SERVER_NAME='localhost'
ENV GZIP='on'

# Expose the default NGINX port
EXPOSE 80

ENTRYPOINT ["sh", "/scripts/commands.sh"]