'use client'
import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { Rectangle } from './Rectangle'
import { useEffect, useState } from 'react'
import { getWeatherIconUrl } from '@/utils/weather-condition-animated'

export default function HourlyForecast() {
  const { weather } = useWeatherContext()

  const getWindowWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 0)

  const [isXl, setIsXl] = useState(getWindowWidth() >= 1280)
  const [isLg, setIsLg] = useState(getWindowWidth() >= 1024)

  const urls: { [key: string]: string } = {
    partlyCloudy: 'https://phils.design/weather-icons/images/svg/b_1_partly_cloudy.svg',
    heavyRain: 'https://phils.design/weather-icons/images/svg/c_2_heavy_rain.svg',
    sunny: 'https://phils.design/weather-icons/images/svg/a_1_sunny.svg',
    clear: 'https://phils.design/weather-icons/images/svg/a_4_night.svg',
    rainy: 'https://phils.design/weather-icons/images/svg/c_1_rainy.svg',
    cloudy: 'https://phils.design/weather-icons/images/svg/b_2_cloudy.svg',
    overcast: 'https://phils.design/weather-icons/images/svg/b_3_very_cloudy.svg',
    fog: 'https://phils.design/weather-icons/images/svg/d_4_fog.svg',
  }

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
        <Rectangle.Image isCol={true} icon={'history'} title='Hourly Forecast' />
        <div className='grid w-full mb-4' style={{gridTemplateColumns: `repeat(${arrayLength}, 1fr)`}}>
          {
            Array.from({ length: arrayLength }).map((_, index) => {
              const hourIndex = (currentHour + index) % 24
              const hourData = weather.forecast.forecastday[0].hour[hourIndex]
              const condition = weather.forecast.forecastday[0].hour[hourIndex].condition.text.toLowerCase()

              const conditionImage = getWeatherIconUrl(condition)

              return (
                <div className={`flex flex-col items-center ${localtime === hourIndex && 'font-bold text-primary'}`} key={index}>
                  <span className='md:text-base lg:text-lg text-[12px]'>
                    {localtime === hourIndex ? 'Now' : hourIndex + ':00'}
                  </span>
                  <iframe src={conditionImage} className='md:w-20 md:h-20 h-12 w-12' />
                  <span className='font-medium md:text-lg lg:text-xl text-sm'>{hourData.temp_c}°</span>
                </div>
              )
            })
          }
        </div>
      </Rectangle.Root>
    </div>
  )
}