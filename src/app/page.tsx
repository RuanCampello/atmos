import DayStats from '@/components/DayStats'
import Display from '@/components/Display'
import HourlyForecast from '@/components/HourlyForecast'

export default async function Home() {
  return (
    <div className='bg-magnolia w-screen h-screen overflow-y-scroll flex-col justify-center items-center flex'>
      <div className='w-full h-full'>
        <Display />
        <DayStats />
        <HourlyForecast />
      </div>
    </div>
  )
}
