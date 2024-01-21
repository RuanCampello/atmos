import { Astro } from "./astro-type"

export type Forecast = {
  forecastday: {
    date: string
    date_epoch: number
    day: {
      maxtemp_c: number
      maxtemp_f: number
      mintemp_c: number
      mintemp_f: number
      avgtemp_c: number
      avgtemp_f: number
      daily_chance_of_rain: number
    }
    astro: Astro
    hour: {
      time: string
      chance_of_rain: number
      temp_c: number
      temp_f: number
      condition: {
        text: string
      }
    }[]
  }[]
}