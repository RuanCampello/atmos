import { clear, directories, fog, heavyrain, overcast, partlycloudy, rain, sunny } from './frog-list'
import { Frog, getIntRandom } from './weather-frog-portrait'

const BASE_URL = 'https://gitlab.com/bignutty/google-weather-icons/-/raw/main/froggie/landscape/'

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
  fog: fog
}

export function randomImagesLandscape(weather: string): string {
  weather = weather.toLowerCase().replace(/\b(?:moderate|patchy|possible|at times|light)\b/g, '').replace(/\s+/g, '')
  const images = frogs[weather]
  const directory = directories[weather]

  if(!images) {
    throw new Error(`Frog for ${weather} not found`)
  }
  const image = images[getIntRandom(images.length)]
  return `${BASE_URL}${directory}${image}.png`
}