'use client'
import { useWeatherContext } from '../contexts/WeatherContext'
import { Rectangle } from './Rectangle'

export default function DayStats() {
  const { weather } = useWeatherContext()
  if(!weather) return 

  const {wind_kph, uv, pressure_mb} = weather.current
  
  const currentHour = new Date(weather.location.localtime).getHours()
  const currentChanceRain = weather.forecast.forecastday[0].hour[currentHour].chance_of_rain
  
  const rectangle = [
    {title: 'Wind speed', icon: 'Wind', data: wind_kph, measure: 'km/h' },
    {title: 'Rain chance', icon: 'Rain', data: currentChanceRain, measure: '%'},
    {title: 'Pressure', icon: 'Waves', data: pressure_mb, measure: 'mb'},
    {title: 'UV Index', icon: 'Uv', data: uv}
  ]
  
  return (
    <div className='gap-4 grid grid-cols-2 lg:grid-cols-4 p-4'>
      {rectangle.map((rec, index) => (
        <Rectangle.Root key={index}>
          <Rectangle.Image icon={rec.icon} title={rec.title} />
          <Rectangle.Data data={rec.data} measure={rec.measure} title={rec.title} />
        </Rectangle.Root>
      ))}
    </div>
  )
}