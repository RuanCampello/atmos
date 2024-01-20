import sunny from '../../public/assets/google-frog/sunny.svg'
import partlyCloudy from '../../public/assets/google-frog/partly-cloudy.svg'
import overcast from '../../public/assets/google-frog/overcast.svg'
import cloudy from '../../public/assets/google-frog/cloudy.svg'
import clear from '../../public/assets/google-frog/clear.svg'
import sunnyLandscape from '../../public/assets/google-frog/sunny-landscape.png'
import partlyCloudyLandscape from '../../public/assets/google-frog/partly-cloudy-landscape.png'
import overcastLandscape from '../../public/assets/google-frog/overcast-lanscape.png'
import cloudyLandscape from '../../public/assets/google-frog/cloudy-landscape.png'
import clearLandscape from '../../public/assets/google-frog/clear-landscape.png'
import { StaticImageData } from 'next/image'

export const WeatherConditionImage: { [key: string]: string | StaticImageData } = {
  Sunny: sunny,
  Overcast: overcast,
  'Partly cloudy': partlyCloudy,
  Cloudy: cloudy,
  Clear: clear,
  'Sunny Landscape': sunnyLandscape,
  'Overcast Landscape': overcastLandscape,
  'Partly cloudy Landscape': partlyCloudyLandscape,
  'Cloudy Landscape': cloudyLandscape,
  'Clear Landscape': clearLandscape,
}