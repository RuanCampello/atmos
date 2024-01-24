import { exclude } from './exclude-adjectives'

const BASE_URL = 'https://phils.design/weather-icons/images/svg/'

export const getWeatherIconUrl = (condition: string): string => {
  const urls: { [key: string]: string } = {
    partlycloudy: 'b_1_partly_cloudy',
    heavyrain: 'c_2_heavy_rain',
    sunny: 'a_1_sunny',
    clear: 'a_4_night',
    rain: 'c_1_rainy',
    drizzle: 'c_1_rainy',
    cloudy: 'b_2_cloudy',
    overcast: 'b_3_very_cloudy',
    fog: 'd_4_fog',
    mist: 'f_3_windy',
    snow: 'd_1_snow',
    heavysnow: 'd_2_heavy_snow',
    sleet: 'd_3_sleet',
    rainwiththunder: 'c_3_thunderstorm'
  }

  condition = condition.toLowerCase().replace(exclude, '').replace(/ /g, '')
  const url: string = `${BASE_URL}${encodeURIComponent(urls[condition])}.svg`
  return url
}
