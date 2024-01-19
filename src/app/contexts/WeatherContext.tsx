'use client'
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { Weather } from '@/types/weather-type'

type WeatherContextType = {
  weather: Weather | null
  setWeather: Dispatch<SetStateAction<Weather | null>>
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

type WeatherContextProviderProps = {
  children: ReactNode
}

export const WeatherContextProvider: React.FC<WeatherContextProviderProps> = ({ children }) => {
  const [weather, setWeather] = useState<Weather | null>(null)

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeatherContext = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherContextProvider')
  }
  return context
}
