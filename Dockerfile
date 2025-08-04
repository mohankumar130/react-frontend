# Stage 1: Build React app
FROM node:20-alpine as build
WORKDIR /app

# Step 1: Copy only package files to leverage cache
COPY package.json ./

# Step 2: Install dependencies (will be cached if package files don’t change)
RUN npm install

# Step 3: Copy the rest of the source code
COPY . .

# Step 4: Build React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN apk update && apk upgrade libxml2

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
