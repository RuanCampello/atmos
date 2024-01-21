import Astro from '@/components/Astro'
import ChanceRain from '@/components/ChanceRain'
import DayForecast from '@/components/DayForecast'
import DayStats from '@/components/DayStats'
import Display from '@/components/Display'
import HourlyForecast from '@/components/HourlyForecast'

export default async function Home() {
  return (
    <div className='bg-magnolia w-screen h-screen md:overflow-hidden overflow-y-scroll flex-col justify-center items-center flex'>
      <div className='w-full h-full'>
        <Display />
        <DayStats />
        <HourlyForecast />
        <div className='md:grid md:grid-cols-2 p-4 flex flex-col gap-4'>
          <DayForecast />
          <div className='bg-pale-purple h-full rounded-2xl w-full'>
            <ChanceRain />
          </div>
        </div>
        <Astro />
      </div>
    </div>
  )
}
