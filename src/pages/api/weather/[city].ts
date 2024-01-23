import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city } = req.query

  const URL = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${city}&days=7&aqi=no&alerts=no`

  try {
    const response = await fetch(URL, { credentials: 'include' })
    if (!response.ok) {
      throw new Error(`Weather API request failed with status ${response.status}`)
    }
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
