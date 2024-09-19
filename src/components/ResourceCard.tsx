import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'

interface Props {
  title: string,
  description: string,
  image: string,
  category: string,
  bgColor: string,
  onClick: (category: string) => void
}

const ResourceCard = ({ title, description, image, category, bgColor, onClick }: Props) => {

  return (
    <div>
      <Card className={`bg-[${bgColor}] hover:shadow-lg cursor-pointer min-h-[325px] max-h-[325px] md:min-h-[375px] md:max-h-[375px]`} onClick={() => onClick(category)}>
        <CardHeader className='flex flex-col justify-center items-center p-0'>
          <Image src={image} alt={title} width={1000} height={1000} className='min-h-48 max-h-48 object-cover' />
          <CardTitle className="flex justify-center items-center">
            <span className="text-lg md:text-xl font-bold pt-2">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col justify-between'>
          <p className='text-xs md:text-sm pt-2'>{description}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResourceCard