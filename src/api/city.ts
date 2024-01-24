import { Weather } from '@/types/weather-type'

export default async function getWeather(city: String) {
  const URL = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
  const response = await fetch(URL)
  const data: Weather = await response.json()
  
  if (!response.ok) {
    throw new Error(`Weather API request failed with status ${response.status}`)
  }
  
  return data
}