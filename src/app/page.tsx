import DayStats from '@/components/DayStats'
import Display from '@/components/Display'

export default async function Home() {
  return (
    <div className='md:bg-eerie-black bg-neutral-100 w-screen h-screen flex-col justify-center items-center flex lg:p-8'>
      <div className='w-full h-full'>
        <Display />
        <DayStats />
      </div>
    </div>
  )
}
