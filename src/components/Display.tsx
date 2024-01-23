'use client'
import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { getWeatherIconUrl } from '@/utils/weather-condition-animated'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import Search from '../../public/assets/google-icons/search.svg'
import { randomImages } from '@/utils/weather-frog-portrait'
import { Weather } from '@/types/weather-type'
import { randomImagesLandscape } from '@/utils/weather-frog-landscape'

export default function Display() {
  const { weather, setWeather } = useWeatherContext()
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [searchQuery, setSearchQuery] = useState(String)
  const [conditionImage, setConditionImage] = useState(String)
  const [isLoading, setIsLoading] = useState(true)
  const [conditionImageLandscape, setConditionImageLandscape] = useState(String)
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
      const response = await fetch(`/api/weather/${city}`)
      if (!response.ok) throw new Error(`Weather API request failed with status ${response.status}`)

      const data: Weather = await response.json()
      setWeather(data)
      setConditionImage(randomImages(data.current.condition.text))
      setConditionImageLandscape(randomImagesLandscape(data.current.condition.text))
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  function handleSearchSubmit(e: FormEvent) {
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
      enableHighAccuracy: false,
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
      ? conditionImageLandscape
      : conditionImage

  const localtime: string = new Date(weather.location.localtime).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(' at', ',')

  const dayTemp = weather.forecast.forecastday[0].day.maxtemp_c
  const nightTemp = weather.forecast.forecastday[0].day.mintemp_c
  const condition = weather.current.condition.text
  const country = weather.location.country
  
  return (
    <>
      { !isLoading ?
      <div className='relative md:text-lg text-neutral-100'>
        <div className='top-6 lg:top-8 absolute px-6 flex justify-between w-full items-center'>
          <div className='lg:text-3xl md:text-2xl text-base font-medium md:font-semibold flex gap-12 select-none'>
            <div className='flex gap-1 z-10 overflow-hidden md:max-w-full max-w-[65vw]'>
              <h1>{weather.location.name},</h1>
              <span className='md:block hidden'>
                {weather.location.region},
              </span>
              <span>
                {country
                .replace('United Kingdom', 'UK')
                .replace('USA', '')
                .replace('United States of America', 'USA')
                .replace('United Arab Emirates', 'UAE')
                }
              </span>
            </div>
          </div>
          <form onSubmit={handleSearchSubmit} className='z-20 text-base relative flex items-center md:ps-7 bg-neutral-100 rounded-full border-2 border-primary md:border-transparent select-text'>
            <Image
             src={Search}
             width={20}
             height={20}
             alt='search'
             className='absolute hidden md:flex md:left-3 svg-purple'
            />
            <input 
             type='text'
             placeholder='Search...'
             className='px-3 py-1 md:w-48 w-24 placeholder:text-base placeholder:text-[13px] placeholder:text-primary/60 text-primary focus:outline-none bg-neutral-100 rounded-full'
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div className='absolute z-10 h-full w-full select-none'>
          <div className='flex lg:top-1/2 md:top-[45%] top-1/2 absolute left-6 items-baseline'>
            <h2 className='xs:text-[80px] text-[64px] xl:text-[120px] leading-6 font-bold'>
              {weather.current.temp_c}°
            </h2>
            <span className='font-medium md:text-base text-sm'>Feels like {weather.current.feelslike_c}°</span>
          </div>
          <div className='absolute bottom-6 px-6 flex justify-between w-full md:w-8/12'>
            <span className='self-end lg:text-lg text-base'>{localtime}</span>
            <div className='flex flex-col text-end font-semibold lg:font-bold md:text-base text-sm'>
              <span>Day {dayTemp}°</span>
              <span>Night {nightTemp}°</span>
            </div>
          </div>
          <div className='flex flex-col w-fit h-fit 2xl:top-1/4 top-1/3 absolute right-0'>
            <iframe src={getWeatherIconUrl(condition)} width={256} height={256} className='2xl:w-48 2xl:h-48 w-36 h-36 md:h-24 md:w-24 self-end md:self-center' />
            <h2 className='font-semibold lg:text-xl lg:font-bold text-base md:pr-6 px-2 leading-5 text-center'>{condition}</h2>
          </div>
        </div>
        <div className='relative'>
          <Image
          src={imageSrc} 
          alt={condition} 
          width={2880}
          height={476}
          className='h-[100vw] w-full object-cover md:object-contain md:w-fit md:h-fit brightness-75 bg-primary lg:rounded-t-none rounded-b-[32px] lg:pt-8 md:pt-20'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-night/50 rounded-xl mix-blend-multiply rounded-b-[32px]'></div>
        </div>
      </div>
      : <div className='bg-primary w-full h-[100vw] md:h-[360px] rounded-b-[32px]'></div>
      }
    </>
  )
}