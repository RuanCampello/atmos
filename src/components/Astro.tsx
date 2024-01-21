'use client'

import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { Rectangle } from './Rectangle'
import { format, formatDistance, parse } from 'date-fns'

interface SubTitleProps {
  text: string
}

export function SubTitle({text}: SubTitleProps) {
  return (
    <div className='h-full flex flex-col text-end justify-end md:text-[15px] text-xs font-medium'>
      {text}
    </div>
  )
}

export default function Astro() {
  const { weather } = useWeatherContext()
  if(!weather) return
  const astro = weather.forecast.forecastday[0].astro
  const currentTime = new Date(weather.location.localtime)

  const sunriseParsed = parse(astro.sunrise, 'hh:mm a', new Date())
  const sunriseFormatted = format(sunriseParsed, 'HH:mm')

  const sunsetParsed = parse(astro.sunset, 'hh:mm a', new Date())
  const sunsetFormatted = format(sunsetParsed, 'HH:mm')  

  function relativeTime(time: string) {
    const targetTime = parse(time, 'HH:mm', new Date())
    const dateToNow = formatDistance(targetTime, currentTime, {addSuffix: true})
    .replace('about', '')
    .replace(' hours', 'h')
    .replace(' minutes', 'm')

    return dateToNow
  }
  return (
    <div className='w-full grid grid-cols-2 gap-4 px-4 pb-4'>
      <Rectangle.Root>
        <Rectangle.Image icon='nightStays' title='Sunrise' />
        <div className='grid grid-cols-2 w-full'>
          <Rectangle.Data title='Sunrise' data={sunriseFormatted} />
          <SubTitle text={relativeTime(sunriseFormatted)} />
        </div>
      </Rectangle.Root>
      <Rectangle.Root>
        <Rectangle.Image icon='routine' title='Sunset' />
        <div className='grid grid-cols-2 w-full'>
          <Rectangle.Data title='Sunset' data={sunsetFormatted} />
          <SubTitle text={relativeTime(sunsetFormatted)} />
        </div>
      </Rectangle.Root>
    </div>
  )
}