import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useResourceService } from '@/lib/clientApiServices/resources'
import { APP_ROLES, STUDY_RESOURCE_TYPE } from '@/lib/shared/enums'
import { useSession } from 'next-auth/react'
import YouTubeVideoCard from './YouTubeVideoCard'
import { IResourceSchema } from '@/lib/interfaces/mongo'
import Loading from './Loading'
interface Props {
}
const YoutubeResources = (props: Props) => {
  const [data, setData] = useState([])
  const resourceService = useResourceService()
  const { status, data: userInfo } = useSession()
  const { isLoading: youtubeResourceLoading } = useQuery({
    queryKey: ["getYoutubeResource"],
    queryFn: async () => {
      return await resourceService.getResources({ typeId: STUDY_RESOURCE_TYPE.YOUTUBE_VIDEO })
    },
    onSuccess: (response) => setData(response.data)
  })
  console.log(userInfo)
  return (
    <div>
      {
        youtubeResourceLoading ? <Loading /> : <div className='w-full grid sm:grid-cols-3 overflow-x-scroll gap-20 sm:px-5 mt-5  '>

          {
            data?.map((video: IResourceSchema) => (
              <YouTubeVideoCard
                description={video.description}
                url={video.url}
                key={video.title}
              />
            ))
          }
        </div>
      }

    </div>
  )
}

export default YoutubeResources