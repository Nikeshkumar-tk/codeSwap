import React from 'react'

interface Props{
    title:string
    description:string
    url:string
    tags:string[]
}
const ArticleCard = (props:Props) => {
    const { description, tags, title, url} = props
  return (
    <div className='w-80 border border-gray-200 rounded px-3 py-3 hover:shadow-md'>
        <h1 className='font-bold text-2xl '>{title}</h1>
        <p className='text-lg mt-4'>{description}</p>
        <div className="flex justify-end">
        <a href={url} target='_blank' className='text-blue-800'>Goto resource</a>
        </div>
    </div>
  )
}

export default ArticleCard