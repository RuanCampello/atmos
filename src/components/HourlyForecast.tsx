'use client'
import { useWeatherContext } from '../contexts/WeatherContext'
import { Rectangle } from './Rectangle'
import { useEffect, useState } from 'react'
import { getWeatherIconUrl } from '@/utils/weather-condition-animated'
import { format } from 'date-fns'

export default function HourlyForecast() {
  const { weather } = useWeatherContext()

  const getWindowWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 0)

  const [isXl, setIsXl] = useState(getWindowWidth() >= 1280)
  const [isLg, setIsLg] = useState(getWindowWidth() >= 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsXl(getWindowWidth() >= 1280)
      setIsLg(getWindowWidth() >= 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const arrayLength = isXl ? 12 : isLg ? 8 : 6

  if(!weather) return
  let currentHour = new Date(weather.location.localtime).getHours()
  if(currentHour > 12 && isXl) currentHour = 12
  else if(currentHour > 16 && isLg) currentHour = 16
  else if(currentHour > 18) currentHour = 18
  
  const localtime = new Date(weather.location.localtime).getHours()
  
  return (
    <div className='px-4'>
      <Rectangle.Root isCol={true}>
        <Rectangle.Image isCol={true} icon={'History'} title='Hourly Forecast' />
        <div className='grid w-full mb-4' style={{gridTemplateColumns: `repeat(${arrayLength}, 1fr)`}}>
          {
            Array.from({length: arrayLength}).map((_, index) => {
              const hourIndex = (currentHour + index) % 24
              const hourData = weather.forecast.forecastday[0].hour[hourIndex]
              const condition = weather.forecast.forecastday[0].hour[hourIndex].condition.text.toLowerCase()

              const conditionImage = getWeatherIconUrl(condition)
              const localHour = format(new Date().setHours(hourIndex), 'HH:00')
              const isNow = localtime === hourIndex
              

              return (
                <div className={`flex flex-col items-center ${isNow ? 'font-bold text-primary' : 'font-medium'}`} key={index}>
                  <span className='md:text-base lg:text-lg text-sm'>
                    {isNow ? 'Now' : localHour}
                  </span>
                  <iframe src={conditionImage} className='md:w-20 md:h-20 h-12 w-12' />
                  <span className='md:text-lg lg:text-xl text-sm'>{hourData.temp_c}°</span>
                </div>
              )
            })
          }
        </div>
      </Rectangle.Root>
    </div>
  )
}