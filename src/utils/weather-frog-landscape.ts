import { exclude } from './exclude-adjectives'
import { clear, directories, fog, heavyrain, heavysnow, overcast, partlycloudy, rain, snow, sunny } from './frog-list'
import { Frog, getIntRandom } from './weather-frog-portrait'

const BASE_URL = 'https://gitlab.com/bignutty/google-weather-icons/-/raw/main/froggie/landscape/'

const landscapeFog = [
  'bridge', 'busstop-waiting', 'fruit-stand', 'hill-cocoa', 'mountain', 
  'pier', 'rooftop'
].concat(fog)

const frogs: Frog = {
  sunny: sunny,
  cloudy: [
    'hills-coffee',
    'home-flowers',
    'orchard-watching'
  ],
  partlycloudy: partlycloudy,
  overcast: overcast,
  clear: clear,
  rain: ['home-inside'].concat(rain),
  heavyrain: heavyrain,
  fog: landscapeFog,
  haze: landscapeFog,
  mist: landscapeFog,
  snow: snow,
  heavysnow: heavysnow
}

export function randomImagesLandscape(weather: string): string {
  weather = weather.toLowerCase().replace(exclude, '').replace(/\s+/g, '')
  const images = frogs[weather]
  let directory: string = directories[weather]

  if (weather === 'overcast') {
    directory = '04-mostly-cloudy-day/04-mostly-cloudy-day-' 
  }

  if(!images) {
    throw new Error(`Frog for ${weather} not found`)
  }
  const image = images[getIntRandom(images.length)]
  return `${BASE_URL}${directory}${image}.png`
}