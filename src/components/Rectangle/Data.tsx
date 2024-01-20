interface RectangleDataProps {
  data: number
  measure?: string
  title?: string
}

export default function RectangleData({data, measure, title}: RectangleDataProps) {
  return (
    <div className='text-sm flex flex-col w-full ms-2'>
      <span className='font-medium md:text-lg lg:text-xl md:leading-6'>{title}</span>
      <span className='lg:text-lg md:leading-6'>{data}{measure}</span>
    </div>
  )
}