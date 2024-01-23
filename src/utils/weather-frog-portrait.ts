import { clear, cloudy, directories, fog, heavyrain, heavysnow, overcast, partlycloudy, rain, snow, sunny } from './frog-list'

export type Frog = {
  [key: string]: string[]
}

const BASE_URL = 'https://gitlab.com/bignutty/google-weather-icons/-/raw/main/froggie/square/'

const frogs: Frog = {
  sunny: [
    'field-biking',
    'hills-painting',
    'hills-reading'].concat(sunny),
  cloudy: cloudy,
  partlycloudy: partlycloudy,
  overcast: overcast,
  clear: clear,
  rain: ['orchard-reading','field-leaf'].concat(rain),
  heavyrain: heavyrain,
  fog: fog,
  haze: fog,
  mist: fog,
  snow: snow,
  heavysnow: ['creek-cocoa'].concat(heavysnow)
}

export function getIntRandom(max: number) {
  return Math.floor(Math.random() * max)
}

export function randomImages(weather: string): string {
  weather = weather.toLowerCase().replace(/\b(?:moderate|patchy|possible|at times|light|or|showers)\b/g, '').replace(/\s+/g, '')
  const images = frogs[weather]
  const directory = directories[weather]

  if(!images) {
    throw new Error(`Frog for ${weather} not found`)
  }
  const image = images[getIntRandom(images.length)]
  return `${BASE_URL}${directory}${image}.png`
}