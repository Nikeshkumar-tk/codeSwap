import React, { useState } from 'react'
import YouTubePlayer from './globals/YouTubePlayer'
import { useQuery } from 'react-query'
import { useResourceService } from '@/lib/clientApiServices/resources'
import { STUDY_RESOURCE_TYPE } from '@/lib/shared/enums'
interface Props{
    // data:any[]
}
const YoutubeResources = (props:Props) => {
    const [data, setData] = useState([])
    const resourceService = useResourceService()
    useQuery({
      queryKey:["getYoutubeResource"],
      queryFn:async() => {
        return await resourceService.getResources({typeId:STUDY_RESOURCE_TYPE.YOUTUBE_VIDEO})
      },
      onSuccess:(response) => setData(response.data)
    })
  return (
    <div className='w-full flex flex-col sm:px-3 mt-5'>
        {
            data?.map((video:any) => (
                <div className='w-80 shadow-md' key={video._id}>
                  <p className='text-2xl font-semibold '>{video.title}</p>  
                   <YouTubePlayer videoId={video.url} className=' w-20 '/> 
                   <p className='font-sans mt-2 p-3'>{video.description}</p>
                </div>
            ))
        }
        </div>
  )
}

export default YoutubeResources