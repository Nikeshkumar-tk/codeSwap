import React, { useState } from 'react'
import YouTubePlayer from './globals/YouTubePlayer'
import { useQuery } from 'react-query'
import { useResourceService } from '@/lib/clientApiServices/resources'
import { APP_ROLES, STUDY_RESOURCE_TYPE } from '@/lib/shared/enums'
import { useSession } from 'next-auth/react'
import YouTubeVideoCard from './YouTubeVideoCard'
import { IResourceSchema } from '@/lib/interfaces/mongo'
interface Props {
  // data:any[]
}
const YoutubeResources = (props: Props) => {
  const [data, setData] = useState([])
  const resourceService = useResourceService()
  const { status, data:userInfo } = useSession()
  useQuery({
    queryKey: ["getYoutubeResource"],
    queryFn: async () => {
      return await resourceService.getResources({ typeId: STUDY_RESOURCE_TYPE.YOUTUBE_VIDEO })
    },
    onSuccess: (response) => setData(response.data)
  })
  console.log(userInfo)
  return (
    <div>
      <div className='w-full grid sm:grid-cols-4 gap-80 sm:px-5 mt-5  '>

        {
          data?.map((video: IResourceSchema) => (
            // <div className='w-80 shadow-md px-3 pt-2' key={video._id}>
            //   <p className='text-2xl font-semibold '>{video.title}</p>
            //   <YouTubePlayer videoId={video.url} className=' w-20 ' />
            //   <p className='font-sans mt-2 p-3'>{video.description}</p>
            // </div>
            <YouTubeVideoCard 
            title={video.title}
            description={video.description}
            url={video.url}
            key={video.title}
            />
          ))
        }
      </div>
    </div>
  )
}

export default YoutubeResources