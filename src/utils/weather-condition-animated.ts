import { exclude } from './exclude-adjectives'

export const getWeatherIconUrl = (condition: string): string => {
  const urls: { [key: string]: string } = {
    partlycloudy: 'https://phils.design/weather-icons/images/svg/b_1_partly_cloudy.svg',
    heavyrain: 'https://phils.design/weather-icons/images/svg/c_2_heavy_rain.svg',
    sunny: 'https://phils.design/weather-icons/images/svg/a_1_sunny.svg',
    clear: 'https://phils.design/weather-icons/images/svg/a_4_night.svg',
    rain: 'https://phils.design/weather-icons/images/svg/c_1_rainy.svg',
    drizzle: 'https://phils.design/weather-icons/images/svg/c_1_rainy.svg',
    cloudy: 'https://phils.design/weather-icons/images/svg/b_2_cloudy.svg',
    overcast: 'https://phils.design/weather-icons/images/svg/b_3_very_cloudy.svg',
    fog: 'https://phils.design/weather-icons/images/svg/d_4_fog.svg',
    mist: 'https://phils.design/weather-icons/images/svg/f_3_windy.svg',
    snow: 'https://phils.design/weather-icons/images/svg/d_1_snow.svg',
    heavysnow: 'https://phils.design/weather-icons/images/svg/d_2_heavy_snow.svg',
    sleet: 'https://phils.design/weather-icons/images/svg/d_3_sleet.svg'
  }

  condition = condition.toLowerCase().replace(exclude, '').replaceAll(' ', '')
  const url: string = urls[condition]
  console.log(condition)
  
  return url
}
