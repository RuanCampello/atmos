<p align='center'>
  <img src='/atmos-banner.png' />
</p>

# Atmos

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blueviolet)](https://atmos-ruancampello.vercel.app) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) ![WeatherAPI](https://img.shields.io/badge/WeatherAPI-4285F4?style=flat&logo=&logoColor=white)

Atmos is a modern weather app built with Next.js, TypeScript, and styled with Tailwind CSS. The design is based on a redesign of the Google Weather.

## Table of Contents
- [Features](#features)
- [Design Inspiration](#design-inspiration)
- [Data Source](#data-source)
- [Animated Icons](#animated-icons)
- [Deployment](#deployment)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [License](#license)

## Features

- **Local Temperature and Feels Like:** Get real-time information about the local temperature and the perceived temperature.
- **Wind Speed, UV Index, and Pressure:** Stay informed with essential weather metrics such as wind speed, UV index, and atmospheric pressure.
- **Local Time:** Display the current local time for quick reference.
- **Chance of Rain:** Know the current chance of rain in your location.
- **Max and Min Temperature:** View the expected maximum and minimum temperatures for the day.
- **Hourly Forecast:** Plan ahead with an hourly forecast showing the temperature for the next 5 hours.
- **Day Forecast Chart:** Explore a chart displaying the average temperature for each day in the upcoming week.
- **Rain Percentage Bar Chart:** Visualize the percentage of rain forecasted for the next 4 hours using a bar chart.
- **Sunset and Sunrise Times:** Be aware of the exact times for sunset and sunrise.
- **Animated Weather Icons:** Enjoy animated weather icons that bring life to your weather experience.

## Design Inspiration

The design of Atmos is based on a redesign of the Google Weather page. Check out the Figma file for the design details: [Google Weather App Redesign (Community)](https://www.figma.com/file/nCKhkWJfABdjRTclnhQANY/Google-Weather-App-Redesign-(Community)?type=design&node-id=0%3A1&mode=design&t=syVtRCx4lxiX5hLq-1).

## Data Source

Weather information is provided by [WeatherAPI](https://www.weatherapi.com/). Make sure to check their documentation for additional details on the data available and usage.

## Animated Icons

The animated weather icons used in Atmos are sourced from the [Weather Icons](https://github.com/philanri/weather-icons) repository.

## Deployment

Explore Atmos by visiting the deployed version: [Atmos Deployment](https://atmos-ruancampello.vercel.app).

## Installation

Make sure you have Node.js and npm installed. Clone the repository and install the dependencies.

```bash
git clone https://github.com/RuanCampello/atmos.git
cd atmos
npm install
```

## Usage

> [!IMPORTANT]
> Get your [WeatherAPI](https://www.weatherapi.com/) API key and set the following variable using a .env.local file:

```
NEXT_PUBLIC_API_KEY: YOUR-API-KEY
```
Run the app locally using the following command:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to explore Atmos.

## Tech Stack

- **Next.js:** A React framework for building server-rendered React applications.
- **TypeScript:** Adds static typing to JavaScript for improved developer productivity and code quality.
- **Tailwind CSS:** A utility-first CSS framework for building modern and responsive designs.

## License

This project is licensed under the [MIT License](LICENSE.md).
