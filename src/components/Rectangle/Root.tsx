import { ReactNode } from 'react'

interface RectangleRootProps {
  children: ReactNode
  isCol?: boolean
}

export default function RectangleRoot({children, isCol}: RectangleRootProps) {
  return (
    <div className={`bg-pale-purple text-night w-full flex items-center rounded-2xl gap-2 px-3 md:px-6 lg:min-h-20 min-h-16 ${isCol && 'flex-col'}`}>
      {children}
    </div>
  )
}