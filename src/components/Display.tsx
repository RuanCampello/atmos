'use client'
import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { getWeatherIconUrl } from '@/utils/weather-condition-animated'
import { getFrogImage } from '@/utils/weather-frog-image'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'

export default function Display() {
  const { weather, setWeather } = useWeatherContext()
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [searchQuery, setSearchQuery] = useState(String)
  const isLocalStorageAvailable = typeof localStorage !== 'undefined'

  const updateWindowWidth = () => setWindowWidth(window.innerWidth)

  useEffect(() => {
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth)
    return () => {
      window.removeEventListener('resize', updateWindowWidth)
    }
  }, [])

  async function getWeather(city: string) {
    try {
      const URL = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
      const response = await fetch(URL)
      if (!response.ok) {
        throw new Error(`Weather API request failed with status ${response.status}`)
      }
      const data = await response.json()
      setWeather(data)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  function handleSearchSubmit(e: any) {
    e.preventDefault()
    if(searchQuery.trim() !== '') {
      getWeather(searchQuery)
    }
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
      ? getFrogImage(weather.current.condition.text + 'landscape')
      : getFrogImage(weather.current.condition.text)

  const localtime: string = new Date(weather.location.localtime).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(' at', ',')

  const dayTemp = weather.forecast.forecastday[0].day.maxtemp_c
  const nightTemp = weather.forecast.forecastday[0].day.mintemp_c

  const condition = weather.current.condition.text
  
  return (
    <>
      <div className='relative md:text-lg text-neutral-100'>
        <div className='top-6 lg:top-8 absolute px-6 flex justify-between w-full items-center'>
          <div className='lg:text-3xl md:text-2xl text-sm font-medium md:font-semibold flex gap-12 select-none'>
            <div className='flex gap-1 z-10'>
              <h1>{weather.location.name},</h1>
              <span>{weather.location.country}</span>
            </div>
          </div>
          <form onSubmit={handleSearchSubmit} className='z-20 md:text-base text-sm relative flex items-center'>
            <input 
             type='text'
             placeholder='Enter a city name'
             className='lg:py-2 md:px-3 p-1 px-2 lg:w-48 w-36 lg:placeholder:text-base placeholder:text-sm placeholder:text-primary/60 text-primary rounded-full focus:outline-none'
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div className='absolute z-10 h-full w-full select-none'>
          <div className='flex lg:top-1/2 md:top-[45%] top-1/2 absolute left-6 items-baseline'>
            <h2 className='text-[64px] xl:text-[120px] leading-6 font-bold'>
              {weather.current.temp_c}°
            </h2>
            <span className='font-medium'>Feels like {weather.current.feelslike_c}°</span>
          </div>
          <div className='absolute bottom-6 px-6 flex justify-between md:justify-normal md:gap-20 w-full'>
            <span className='self-end'>{localtime}</span>
            <div className='flex flex-col text-end font-bold md:text-base text-sm'>
              <span>Day {dayTemp}°</span>
              <span>Night {nightTemp}°</span>
            </div>
          </div>
          <div className='flex flex-col items-center w-fit h-fit md:top-[20%] top-1/3 absolute right-0'>
            <iframe src={getWeatherIconUrl(condition)} width={256} height={256} className='lg:w-48 lg:h-48 w-36 h-36' />
            <h2 className='font-medium text-lg pr-6 leading-5'>{condition}</h2>
          </div>
        </div>
        <Image
        src={imageSrc} 
        alt={weather.current.condition.text} 
        width={2880}
        height={476}
        className='h-[100vw] w-full object-cover object-bottom md:object-contain md:w-fit md:h-fit brightness-75 md:bg-primary lg:rounded-t-none rounded-b-[32px] lg:pt-8 md:pt-24'
        />
      </div>
    </>
  )
}