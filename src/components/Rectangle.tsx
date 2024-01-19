import Wind from '../../public/assets/google-icons/wind.svg'
import Waves from '../../public/assets/google-icons/waves.svg'
import Uv from '../../public/assets/google-icons/light-mode.svg'
import RainChance from '../../public/assets/google-icons/rainy.svg'
import Image from 'next/image'

interface RectangleProps {
  title: string
  icon: string
  data: number
  measure?: string
}

const Icons: { [key: string]: string } = {
  wind: Wind,
  waves: Waves,
  uv: Uv,
  rain: RainChance
}

export default function Rectangle({title, icon, data, measure}: RectangleProps) {
  return (
    <div className='bg-pale-purple text-night w-full flex items-center rounded-2xl gap-2 px-3 h-16'>
      <div className='p-1 bg-neutral-100 w-fit rounded-full shrink-0'>
        <Image src={Icons[icon]} width={16} height={16} alt={title} />
      </div>
      <div className='text-sm flex flex-col'>
        <span className='font-medium'>{title}</span>
        <span>{data} {measure}</span>
      </div>
    </div>
  )
}