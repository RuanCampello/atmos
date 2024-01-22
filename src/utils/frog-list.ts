export const partlycloudy = [
  'orchard-treeswing',
  'orchard-butterflies',
  'home-flowers',
  'hills-reading',
  'hills-painting',
  'field-hiking',
  'field-biking',
  'creek-feet',
  'citypark-ukelele',
  'beach-shells',
]

export const sunny = [
  'beach-reading',
  'beach-sandcastle',
  'beach-sunscreen',
  'citypark-sunbathing',
  'creek-swimming',
  'field-kite',
  'hills-sunbathing',
  'home-laundry',
  'orchard-picking',
  'rooftop-pinacolada'
]

export const cloudy = [
  'hills-coffee',
  'home-flowers',
  'orchard-watching'
]

export const overcast = [
  'orchard-treeswing',
  'orchard-butterflies',
  'home-flowers',
  'hills-reading',
  'hills-painting',
  'field-hiking',
  'field-biking',
  'creek-feet',
  'citypark-ukelele',
  'beach-shells'
]

export const clear = [
  'orchard-fireflies',
  'home-lounging',
  'hills-telescope',
  'hills-camping',
  'field-lanterns',
  'creek-stars'
]

export const rain = ['home-laundry', 'hills-umbrella', 'creek-leaf']

export const heavyrain = ['busstop-umbrella', 'creek-leaf']

export const fog = ['field-lantern']

export const snow = ['citypark-snowman', 'creek-iceskating', 'home-shoveling']

export const heavysnow = ['home-inside', 'home-shoveling']

export type Dir = {
  [key: string]: string
}

export const directories: Dir = {
  sunny: '01-sunny/01-sunny-',
  cloudy: '09-cloudy/09-cloudy-',
  partlycloudy: '03-partly-cloudy-day/03-partly-cloudy-day-',
  clear: '05-clear/05-clear-',
  rain: '11-rain/11-rain-',
  heavyrain: '12-heavy-rain/12-heavy-rain-',
  fog: '26-haze-fog-dust-smoke/26-haze-fog-dust-smoke-',
  haze: '26-haze-fog-dust-smoke/26-haze-fog-dust-smoke-',
  mist: '26-haze-fog-dust-smoke/26-haze-fog-dust-smoke-',
  overcast: '04-mostly-cloudy/04-mostly-cloudy-day-',
  snow: '15-snow-showers-snow/15-snow-showers-snow-',
  heavysnow: '17-heavy-snow-blizzard/17-heavy-snow-blizzard-'
}