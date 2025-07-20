# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ["CareerGlide.API.csproj", "."]
RUN dotnet restore "CareerGlide.API.csproj"

# Copy the entire project and publish
COPY . .
RUN dotnet publish "CareerGlide.API.csproj" -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "CareerGlide.API.dll"]
