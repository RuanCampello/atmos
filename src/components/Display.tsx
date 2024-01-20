'use client'
import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { WeatherConditionImage } from '@/utils/weather-condition-image'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'

export default function Display() {
  const { weather, setWeather } = useWeatherContext()
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  const isLocalStorageAvailable = typeof localStorage !== 'undefined'

  const updateWindowWidth = () => setWindowWidth(window.innerWidth)

  useEffect(() => {
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth)
    return () => {
      window.removeEventListener('resize', updateWindowWidth)
    }
  }, [])

  async function getWeather(city:string) {
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
    const response = await fetch(URL) 
    const data = await response.json()
    setWeather(data)
  }
  const geolocationPermission = isLocalStorageAvailable
    ? localStorage.getItem('geolocationPermission'): 'denied'

  const isGranted = geolocationPermission === 'granted'
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
    suppressLocationOnMount: isGranted,
  })

  if (coords?.latitude && coords?.longitude && isLocalStorageAvailable) {
    localStorage.setItem('latitude', coords.latitude.toString())
    localStorage.setItem('longitude', coords.longitude.toString())
    localStorage.setItem('geolocationPermission', 'granted')
  }

  const storedLatitude = isLocalStorageAvailable ? localStorage.getItem('latitude') : null
  const storedLongitude = isLocalStorageAvailable ? localStorage.getItem('longitude') : null

  const query = (storedLatitude && storedLongitude)
    ? `${storedLatitude},${storedLongitude}`
    : 'London'

  useEffect(() => {
    getWeather(query)
  }, [query])

  if(!weather) return

  const imageSrc =
    windowWidth >= 768
      ? WeatherConditionImage[weather.current.condition.text + ' Landscape']
      : WeatherConditionImage[weather.current.condition.text]

  const localtime: string = new Date(weather.location.localtime).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(' at', ',')

  const dayTemp = weather.forecast.forecastday[0].day.maxtemp_c
  const nightTemp = weather.forecast.forecastday[0].day.mintemp_c
  
  return (
    <>
      <div className='relative md:text-lg select-none'>
        <div className='top-0 absolute z-10 m-6'>
          <div className='md:text-3xl text-2xl font-medium md:font-semibold flex gap-12 flex-col'>
            <div className='flex gap-1'>
              <h1>{weather.location.name},</h1>
              <span>{weather.location.country}</span>
            </div>
          </div>
        </div>
        <div className='absolute z-10 lg:top-1/2 md:top-1/3 top-1/2 m-6 flex items-baseline'>
          <h2 className='text-[64px] xl:text-[120px] leading-6 font-bold'>
            {weather.current.temp_c}°
          </h2>
          <span className='font-medium'>Feels like {weather.current.feelslike_c}°</span>
        </div>
        <div className='absolute grid grid-cols-2 w-screen font-medium bottom-0 z-10 p-6'>
          <span className='self-end'>{localtime}</span>
          <div className='flex flex-col text-end font-bold'>
            <span>Day {dayTemp}°</span>
            <span>Night {nightTemp}°</span>
          </div>
        </div>
        <Image
        src={imageSrc} 
        alt={weather.current.condition.text} 
        width={2880}
        height={476}
        className='h-[100vw] w-full object-cover object-bottom md:object-contain md:w-fit md:h-fit brightness-75 md:bg-primary lg:rounded-t-none rounded-b-[32px] lg:pt-6 md:pt-20'
        />
      </div>
    </>
  )
}