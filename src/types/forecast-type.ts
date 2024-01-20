export type Forecast = {
  forecastday: {
    date: Date
    date_epoch: number
    day: {
      maxtemp_c: number
      maxtemp_f: number
      mintemp_c: number
      mintemp_f: number
      daily_chance_of_rain: number
    }
    hour: {
      chance_of_rain: number
      temp_c: number
      temp_f: number
      condition: {
        text: string
      }
    }[]
  }[]
}