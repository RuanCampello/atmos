import sunny from '../../public/assets/google-frog/sunny.svg'
import partlycloudy from '../../public/assets/google-frog/partly-cloudy.svg'
import overcast from '../../public/assets/google-frog/overcast.svg'
import cloudy from '../../public/assets/google-frog/cloudy.svg'
import clear from '../../public/assets/google-frog/clear.svg'
import sunnylandscape from '../../public/assets/google-frog/sunny-landscape.png'
import partlycloudylandscape from '../../public/assets/google-frog/partly-cloudy-landscape.png'
import overcastlandscape from '../../public/assets/google-frog/overcast-lanscape.png'
import cloudylandscape from '../../public/assets/google-frog/cloudy-landscape.png'
import clearlandscape from '../../public/assets/google-frog/clear-landscape.png'
import lightrainlandscape from '../../public/assets/google-frog/light-rain-landscape.png'
import lightrain from '../../public/assets/google-frog/light-rain.svg'
import fog from '../../public/assets/google-frog/fog.svg'
import foglandscape from '../../public/assets/google-frog/fog-landscape.png'

import { StaticImageData } from 'next/image'

const imageUrls: { [key: string]: StaticImageData } = {
  partlycloudy,
  partlycloudylandscape,
  sunny,
  sunnylandscape,
  clear,
  clearlandscape,
  cloudy,
  cloudylandscape,
  overcast,
  overcastlandscape,
  lightrain,
  lightrainlandscape,
  fog,
  foglandscape,
}

export const getFrogImage = (condition: string): StaticImageData => {
  condition = condition.replaceAll(' ', '')
  .replace('Patchy', '')
  .replace('at times', '')
  .toLowerCase()  
  
  const matchingKey = Object.keys(imageUrls).find(key => condition === key)
  return matchingKey ? imageUrls[matchingKey]
  : condition.includes('landscape') ? imageUrls['sunnyLandscape']
  : imageUrls['sunny']
}