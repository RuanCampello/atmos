import { Current } from './current-type'
import { Forecast } from './forecast-type'
import { Location } from './location-type'

export type Weather = {
  location: Location
  current: Current
  forecast: Forecast
}