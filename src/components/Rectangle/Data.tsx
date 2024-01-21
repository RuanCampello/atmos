interface RectangleDataProps {
  data: number | string
  measure?: string
  title?: string
}

export default function RectangleData({data, measure, title}: RectangleDataProps) {
  return (
    <div className='flex flex-col w-full ms-2'>
      <span className='font-semibold md:text-lg lg:text-xl text-sm md:leading-6'>{title}</span>
      <span className='lg:text-lg md:leading-6 md:font-medium'>{data}{measure}</span>
    </div>
  )
}