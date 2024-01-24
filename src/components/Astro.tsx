'use client'

import { useWeatherContext } from '../contexts/WeatherContext'
import { parse } from 'date-fns'
import { AstroItem } from './AstroItem'
export default function Astro() {
  const { weather } = useWeatherContext()
  if(!weather) return

  const astro = weather.forecast.forecastday[0].astro

  const sunriseParsed = parse(astro.sunrise, 'hh:mm a', new Date())
  const sunsetParsed = parse(astro.sunset, 'hh:mm a', new Date())

  const moonriseParse = parse(astro.moonrise, 'hh:mm a', new Date())
  const moonsetParse = parse(astro.moonset, 'hh:mm a', new Date())

  return (
    <div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-4 px-4 pb-4'>
      <AstroItem title='Sunrise' icon='SunnyShowing' data={sunriseParsed} />
      <AstroItem title='Sunset' icon='Twilight' data={sunsetParsed} />
      <AstroItem title='Moonrise' icon='NightStays' data={moonriseParse} />
      <AstroItem title='Moonset' icon='ModeNight' data={moonsetParse} />
    </div>
  )
}