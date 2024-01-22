import { formatDistance, parse } from 'date-fns'
import { Rectangle } from './Rectangle'
import { useWeatherContext } from '@/app/contexts/WeatherContext'

interface AstroItemProps {
  data: string
  title: string
  icon: string
}

export function AstroItem({data, title, icon}: AstroItemProps) {
  const { weather } = useWeatherContext()
  if(!weather) return 
  const currentTime = new Date(weather.location.localtime)
  function relativeTime(time: string) {
    const targetTime = parse(time, 'HH:mm', new Date())
    const dateToNow = formatDistance(targetTime, currentTime, {addSuffix: true})
    .replace('about', '')
    .replace(' hours', 'h')
    .replace(' minutes', 'm')

    return dateToNow
  }

  return (
    <Rectangle.Root>
      <Rectangle.Image icon={icon} title={title} />
      <div className='grid grid-cols-2 w-full'>
        <Rectangle.Data title={title} data={data} />
        <SubTitle text={relativeTime(data)} />
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