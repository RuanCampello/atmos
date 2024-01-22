export const getWeatherIconUrl = (condition: string): string => {
  const urls: { [key: string]: string } = {
    partlyCloudy: 'https://phils.design/weather-icons/images/svg/b_1_partly_cloudy.svg',
    heavyRain: 'https://phils.design/weather-icons/images/svg/c_2_heavy_rain.svg',
    sunny: 'https://phils.design/weather-icons/images/svg/a_1_sunny.svg',
    clear: 'https://phils.design/weather-icons/images/svg/a_4_night.svg',
    rainy: 'https://phils.design/weather-icons/images/svg/c_1_rainy.svg',
    cloudy: 'https://phils.design/weather-icons/images/svg/b_2_cloudy.svg',
    overcast: 'https://phils.design/weather-icons/images/svg/b_3_very_cloudy.svg',
    fog: 'https://phils.design/weather-icons/images/svg/d_4_fog.svg',
  }

  condition = condition.toLowerCase()

  return condition.includes('partly') ? urls['partlyCloudy']
    : condition.includes('cloudy') ? urls['cloudy']
    : condition.includes('overcast') ? urls['overcast']
    : condition.includes('fog') ? urls['fog']
    : condition.includes('patchy') ? urls['rainy']
    : condition.includes('rain') ? urls['heavyRain']
    : condition.includes('clear') ? urls['clear']
    : urls['sunny']
}
