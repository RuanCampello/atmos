import { exclude } from './exclude-adjectives'

const BASE_URL = 'https://phils.design/weather-icons/images/svg/'

export const getWeatherIconUrl = (condition: string): string => {
  const urls: { [key: string]: string } = {
    partlycloudy: 'b_1_partly_cloudy.svg',
    heavyrain: 'c_2_heavy_rain.svg',
    sunny: 'a_1_sunny.svg',
    clear: 'a_4_night.svg',
    rain: 'c_1_rainy.svg',
    drizzle: 'c_1_rainy.svg',
    cloudy: 'b_2_cloudy.svg',
    overcast: 'b_3_very_cloudy.svg',
    fog: 'd_4_fog.svg',
    mist: 'f_3_windy.svg',
    snow: 'd_1_snow.svg',
    heavysnow: 'd_2_heavy_snow.svg',
    sleet: 'd_3_sleet.svg'
  }

  condition = condition.toLowerCase().replace(exclude, '').replace(/ /g, '')
  const url: string = `${BASE_URL}${encodeURIComponent(urls[condition])}`
  return url
}
