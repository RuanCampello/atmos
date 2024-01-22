'use client'

import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { format, parse } from 'date-fns'
import { AstroItem } from './AstroItem'
export default function Astro() {
  const { weather } = useWeatherContext()
  if(!weather) return

  const astro = weather.forecast.forecastday[0].astro

  const sunriseParsed = parse(astro.sunrise, 'hh:mm a', new Date())
  const sunriseFormatted = format(sunriseParsed, 'HH:mm')
  const sunsetParsed = parse(astro.sunset, 'hh:mm a', new Date())
  const sunsetFormatted = format(sunsetParsed, 'HH:mm')

  const moonriseParse = parse(astro.moonrise, 'hh:mm a', new Date())
  const moonriseFormatted = format(moonriseParse, 'HH:mm')
  const moonsetParse = parse(astro.moonset, 'hh:mm a', new Date())
  const moonsetFormatted = format(moonsetParse, 'HH:mm')

  return (
    <div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-4 px-4 pb-4'>
      <AstroItem title='Sunrise' icon='SunnyShowing' data={sunriseFormatted} />
      <AstroItem title='Sunset' icon='Twilight' data={sunsetFormatted} />
      <AstroItem title='Moonrise' icon='NightStays' data={moonriseFormatted} />
      <AstroItem title='Moonset' icon='ModeNight' data={moonsetFormatted} />
    </div>
  )
}