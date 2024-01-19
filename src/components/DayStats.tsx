'use client'
import { useWeatherContext } from '@/app/contexts/WeatherContext'
import Rectangle from './Rectangle'

export default function DayStats() {
  const { weather } = useWeatherContext()
  if(!weather) return 

  console.log(weather.current)
  

  const {wind_kph, uv, pressure_mb} = weather.current
  const currentHour = new Date().getHours()
  const currentChanceRain = weather.forecast.forecastday[0].hour[currentHour-1].chance_of_rain
  
  const rectangle = [
    {title: 'Wind speed', icon: 'wind', data: wind_kph, measure: 'km/h' },
    {title: 'Rain chance', icon: 'rain', data: currentChanceRain, measure: '%'},
    {title: 'Pressure', icon: 'waves', data: pressure_mb, measure: 'mb'},
    {title: 'UV Index', icon: 'uv', data: uv}
  ]
  
  return (
    <div className='gap-4 grid grid-cols-2 p-4'>
      {rectangle.map((rec, index) => (
        <Rectangle key={index} title={rec.title} icon={rec.icon} data={rec.data} measure={rec.measure} />
      ))}
    </div>
  )
}