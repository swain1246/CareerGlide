# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["CareerGlide.API/CareerGlide.API.csproj", "CareerGlide.API/"]
RUN dotnet restore "CareerGlide.API/CareerGlide.API.csproj"

# Copy the remaining files and build the app
COPY . .
WORKDIR "/src/CareerGlide.API"
RUN dotnet publish "CareerGlide.API.csproj" -c Release -o /app/publish

# Use the ASP.NET runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "CareerGlide.API.dll"]
