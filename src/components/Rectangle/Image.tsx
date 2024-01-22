import Image from 'next/image'

import Wind from '../../../public/assets/google-icons/wind.svg'
import Waves from '../../../public/assets/google-icons/waves.svg'
import Uv from '../../../public/assets/google-icons/light-mode.svg'
import Rain from '../../../public/assets/google-icons/rainy.svg'
import History from '../../../public/assets/google-icons/history.svg'
import Calendar from '../../../public/assets/google-icons/calendar.svg'
import Routine from '../../../public/assets/google-icons/routine.svg'
import NightStays from '../../../public/assets/google-icons/night-stays.svg'
import SunnyShowing from '../../../public/assets/google-icons/sunny-snowing.svg'
import Twilight from '../../../public/assets/google-icons/twilight.svg'
import ModeNight from '../../../public/assets/google-icons/modeNight.svg'

interface RectangleImageProps {
  icon: string
  title: string
  isCol?: boolean
}

const Icons: { [key: string]: string } = {
  Wind,
  Waves,
  Uv,
  Rain,
  History,
  Calendar,
  Routine,
  NightStays,
  SunnyShowing,
  Twilight,
  ModeNight
}

export default function RectangleImage({icon, title, isCol}: RectangleImageProps) {
  return (
    <div className={`flex items-center gap-2 ${isCol && 'w-full mt-2'}`}>
      <div className={`p-1 md:p-2 bg-neutral-100 justify-self-start flex rounded-full shrink-0 grow-0`}>
        <Image src={Icons[icon]} width={32} height={32} alt={title} className='w-4 h-4 md:w-8 md:h-8' />
      </div>
        {isCol &&
          <span className='font-medium md:text-lg lg:text-xl md:leading-6 text-sm'>{title}</span>
        }
    </div>
  )
}