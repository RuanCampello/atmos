export type Current = {
  last_updated_epoch: number
  last_updated: Date
  temp_c: number
  temp_f: number
  is_day: number
  feelslike_c: number
  condition: {
    text: string
  }
}