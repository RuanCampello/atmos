import { formatDistance, format } from 'date-fns'
import { Rectangle } from './Rectangle'
import { useWeatherContext } from '@/app/contexts/WeatherContext'

interface AstroItemProps {
  data: Date
  title: string
  icon: string
}

export function AstroItem({data, title, icon}: AstroItemProps) {
  const { weather } = useWeatherContext()
  if(!weather) return 
  
  const currentTime = new Date(weather.location.localtime)
  const targetTime = format(data, 'HH:mm')

  function relativeTime() {
    const dateToNow: string = formatDistance(data, currentTime, {addSuffix: true})
    .replace('about', '')
    .replace(' hours', 'h')
    .replace(' minutes', 'm')

    return dateToNow
  }

  return (
    <Rectangle.Root>
      <Rectangle.Image icon={icon} title={title} />
      <div className='grid grid-cols-2 w-full'>
        <Rectangle.Data title={title} data={targetTime} />
        <SubTitle text={relativeTime()} />
      </div>
    </Rectangle.Root>
  )
}

interface SubTitleProps {
  text: string
}

function SubTitle({text}: SubTitleProps) {
  return (
    <div className='h-full flex flex-col text-end justify-end lg:text-base md:text-sm text-xs font-medium'>
      {text}
    </div>
  )
}