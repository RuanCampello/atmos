'use client'
import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { Rectangle } from './Rectangle'
import { useEffect, useState } from 'react'

export default function HourlyForecast() {
  const { weather } = useWeatherContext()
  const [isXl, setIsXl] = useState(false)
  const [isLg, setIsLg] = useState(false)

  const urls: { [key: string]: string } = {
    partlyCloudy: 'https://phils.design/weather-icons/images/svg/b_1_partly_cloudy.svg',
    heavyRain: 'https://phils.design/weather-icons/images/svg/c_2_heavy_rain.svg',
    sunny: 'https://phils.design/weather-icons/images/svg/a_1_sunny.svg',
    clear: 'https://phils.design/weather-icons/images/svg/a_4_night.svg',
    rainy: 'https://phils.design/weather-icons/images/svg/c_1_rainy.svg'
  }
  
  const currentHour = new Date().getHours()

  useEffect(() => {
    const handleResize = () => {
      setIsXl(window.innerWidth >= 1280)
      setIsLg(window.innerWidth >= 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const arrayLength = isXl ? 12 : isLg ? 8 : 6

  if(!weather) return
  
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

              const conditionImage = condition.includes('partly') ? urls['partlyCloudy']
              : condition.includes('patchy') ? urls['rainy']
              : condition.includes('rain') ? urls['heavyRain']
              : condition.includes('clear') ? urls['clear'] 
              : urls['sunny']

              console.log(condition)
              
              return (
                <div className='flex flex-col items-center' key={index}>
                  <span className='md:text-base lg:text-lg text-[12px]'>{hourIndex === currentHour ? 'Now' : hourIndex + ':00'}</span>
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