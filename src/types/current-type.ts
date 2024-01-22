import { Condition } from './condition-type'

export type Current = {
  last_updated_epoch: number
  last_updated: Date
  temp_c: number
  temp_f: number
  wind_kph: number
  pressure_mb: number
  uv: number
  is_day: number
  feelslike_c: number
  condition: Condition
}