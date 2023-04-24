import React from 'react'
import YouTubePlayer from './globals/YouTubePlayer'
interface Props{
    data:any[]
}
const YoutubeResources = (props:Props) => {
    const { data } = props
  return (
    <div>
        {
            data.map((video:any) => (
                <div>
                  <p className='text-2xl font-semibold '>{video.title}</p>  
                   <YouTubePlayer videoId={video.url} className='mt-2'/> 
                   <p className='font-sans mt-2'>{video.description}</p>
                </div>
            ))
        }
        </div>
  )
}

export default YoutubeResources