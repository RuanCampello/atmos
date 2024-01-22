'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Rectangle } from './Rectangle'
import { useWeatherContext } from '@/app/contexts/WeatherContext'
import { format, parseISO } from 'date-fns'

interface DailyForecast {
  date: string
  avg: number
}
export default function DayForecast() {
  const { weather } = useWeatherContext()
  if(!weather) return

  const dailyForecast: DailyForecast[] = weather.forecast.forecastday.map((day) => ({
    date: day.date,
    avg: day.day.avgtemp_c
  }))

  return (
    <>
      <Rectangle.Root isCol={true}>
        <Rectangle.Image isCol={true} icon={'Calendar'} title='Day Forecast' />
        
        <ResponsiveContainer width={'100%'} height={168}>
          <AreaChart data={dailyForecast}>
            <defs>
              <linearGradient id='colour' x1={0} y1={0} x2={0} y2={1}>
                <stop offset={'10%'} stopColor='#2B00A5' stopOpacity={0.5}/>
                <stop offset={'100%'} stopColor='#120045' stopOpacity={0}/>
              </linearGradient>
            </defs>
            <YAxis
             dataKey={'avg'}
             tickCount={3}
             tickLine={false}
             stroke='#000000'
             tick={{fontSize: 16}}
             tickFormatter={(value) => `${value}°`}
            />
            <XAxis
             dataKey={'date'}
             tickLine={false}
             stroke='#000000'
             tick={{fontSize: 15}}
             tickFormatter={(dateString) => format(parseISO(dateString), 'EEE')}
            />
            <Area dataKey={'avg'} strokeWidth={3} type={'monotone'} stroke='#000000' fill='url(#colour)' />
          <Tooltip content={<CustomTooltip/>}/>
          <CartesianGrid vertical={false} stroke='#000000' opacity={0.13} />
          </AreaChart>
        </ResponsiveContainer>

      </Rectangle.Root>
    </>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-magnolia flex flex-col p-1 px-4 rounded-xl font-medium md:text-lg text-sm'>
        <span>{format(parseISO(label), 'EEEE, d')}</span>
        <span className='text-[#3a0ca3]'>{payload[0].value}°</span>
      </div>
    )
    }
  return null
}