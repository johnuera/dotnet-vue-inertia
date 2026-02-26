# ---------- Frontend build (Vite outputs to wwwroot/) ----------
FROM node:20-alpine AS frontend-build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Backend build ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src

# Copy project file and restore
COPY *.csproj ./
RUN dotnet restore

# Copy everything else
COPY . .

# Publish backend
RUN dotnet publish -c Release -o /app/publish

# Copy built frontend (wwwroot with assets + manifest.json)
COPY --from=frontend-build /app/wwwroot/ /app/publish/wwwroot/

# ---------- Runtime ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:5000
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 5000

COPY --from=backend-build /app/publish ./

ENTRYPOINT ["dotnet", "VueInertiaNet.dll"]