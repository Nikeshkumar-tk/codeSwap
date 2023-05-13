import React from 'react'
import YouTubePlayer from './globals/YouTubePlayer'

interface Props{
    title:string
    description:string
    url:string
}
//px-3 border h-96 w-96 py-2 for bg screens
const YouTubeVideoCard = (props:Props) => {
    const { title, description, url} = props
  return (
    <div className=' px-1 h-96 py-2 sm:px-3 sm:w-96 border rounded hover:shadow-md '>
        <h1 className='font-bold text-2xl   flex items-center'>{title}</h1>
        <YouTubePlayer videoId={url} className=' w-20 mt-2' />
        <p className="text-lg mt-5 flex items-center">{description}</p>
    </div>
  )
}

export default YouTubeVideoCard