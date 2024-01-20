'use client'

import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { Rectangle } from './Rectangle'
import { addHours, format } from 'date-fns'

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

  const currentHour = new Date(weather.location.localtime).getHours()

  // get chance of raining of the next three hours
  const nextThreeHours = Array.from({ length: 5 }, (_, index) => {
    const nextHour = addHours(currentHour, index)
    const matchingHourlyRain = hourlyRain.find((hour) => format(new Date(hour.time), 'HH:mm') === format(nextHour, 'HH:mm'))
    return { time: nextHour, chance_of_rain: matchingHourlyRain ? matchingHourlyRain.chance_of_rain : 0 }
  })

  return (
    <div className='text-night w-full'>
      <Rectangle.Root isCol={true} >
        <Rectangle.Image title='Chance of rain' icon='rain' isCol={true} />
        {
          nextThreeHours.map((hour, index) => {
            return (
              <div key={index} className={`grid grid-cols-5 items-center lg:grid-cols-7 md:grid-cols-4 w-full md:text-base text-sm ${nextThreeHours.length-1 === index && 'pb-4'}`}>
                <span className='font-medium px-4 lg:text-lg text-center'>{format(hour.time, 'HH:00')}</span>
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