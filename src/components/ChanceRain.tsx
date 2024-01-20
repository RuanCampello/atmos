'use client'

import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { Rectangle } from './Rectangle'
import { addHours, format, getHours, parse } from 'date-fns'

interface HourlyRain {
  time: string
  chance_of_rain: number
}

export default function ChanceRain() {
  const { weather } = useWeatherContext()
  if(!weather) return
  
  const hourlyRain: HourlyRain[] = weather.forecast.forecastday[0].hour.map((hour) => ({
    time: hour.time,
    chance_of_rain: hour.chance_of_rain
  }))

  let currentHour = new Date(weather.location.localtime).getHours()
  const localtime = new Date(weather.location.localtime).getHours()
  if(currentHour > 19) currentHour = 19

  // get chance of raining of the next five hours
  const nextFiveHours = Array.from({ length: 5 }, (_, index) => {
      const nextHour = new Date(currentHour)
      nextHour.setHours(currentHour + index)
  
      const nextHourFormatted = format(nextHour, 'HH:mm')
      const matchingHourlyRain = hourlyRain.find((hourlyEntry) => {
          const entryTimeFormatted = format(new Date(hourlyEntry.time), 'HH:mm')
          return entryTimeFormatted === nextHourFormatted
      })
  
      return { hour: nextHourFormatted, chance_of_rain: matchingHourlyRain ? matchingHourlyRain.chance_of_rain : 0 }
  })

  console.log(weather.forecast.forecastday[0])
  
  return (
    <div className='text-night w-full'>
      <Rectangle.Root isCol={true} >
        <Rectangle.Image title='Chance of rain' icon='rain' isCol={true} />
        {
          nextFiveHours.map((hour, index) => {
            const parsedTime = parse(hour.hour, 'HH:mm', new Date())     
            const hours = getHours(parsedTime)
            const isNow = hours === localtime
            return (
              <div key={index} className={`grid grid-cols-5 items-center lg:grid-cols-7 md:grid-cols-4 w-full md:text-base text-sm ${nextFiveHours.length-1 === index && 'pb-4'} ${isNow ? 'text-primary font-bold' : 'font-medium' }`}>
                <span className='px-4 lg:text-lg text-center'>
                  {isNow ? 'Now' : hour.hour}
                </span>
                <div className='relative w-full lg:col-span-5 md:col-span-2 col-span-3'>
                  <div style={{width: `${hour.chance_of_rain}%`}} className='bg-primary lg:h-8 h-6 max-w-full absolute rounded-full'>
                  </div>
                  <div className='w-full lg:h-8 h-6 rounded-full bg-magnolia'></div>
                </div>
                <span className='font-medium px-4 md:text-lg text-center'>{`${hour.chance_of_rain}%`}</span>
              </div>
            )
          })
        }
      </Rectangle.Root>
    </div>
  )
}