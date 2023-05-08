import Modal from '@/components/Modal'
import { PrimaryButton } from '@/components/globals/Buttons'
import { useConfigService } from '@/lib/clientApiServices/config'
import { ROOT_CONFIGS_IDS } from '@/lib/shared/enums'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import YoutubeResources from '@/components/YoutubeResources'
import AddResourceModal from '@/components/modals/AddResource'
import { useSession } from 'next-auth/react'

const ResourceHomePage = () => {
  const [hydrated, setHydrated] = useState<boolean>()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [studyResourceTypes, setStudyResourceTypes] = useState<any[]>([])
  const configService = useConfigService()
  const {data} = useSession()
  const tabValues: string[] = ["Youtube videos", "Articles"]
  useQuery({
    queryKey: ["study_resource_type"],
    queryFn: async () => {
      return await configService.getConfig({ rootId: ROOT_CONFIGS_IDS.STUDY_RESOURCE_TYPE })
    },
    onSuccess: (response) => {
      setStudyResourceTypes(response.data[0].children)
      console.log(response.data)
    },
    onError: (error) => console.log(error)
  })
  useEffect(() => {
    setHydrated(true)
  })
  if (!hydrated) return null
  return (
    <div className='py-24 px-8 sm:px-20 '>
      <div className='w-full flex justify-between'>
        <h1 className='text-2xl font-semibold '>Explore resources</h1>
      {/* @ts-ignore */}
        {data?.user?.role === "admin" &&  <button onClick={() => setOpenAddModal(true)} className='rounded-md border border-gray-600 px-3.5 py-1 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-300'>Add new</button>}
       
      </div>
      <ul className='flex gap-3 mt-3'>
        {
          tabValues.map((value: string) => (
            <li key={value} className={`hover:bg-indigo-700 flex items-center whitespace-nowrap font-sans text-[18px] ${selectedCategory === value && "text-indigo-700"} hover:text-white rounded-full px-3 py-1.5 cursor-pointer`} onClick={() => setSelectedCategory(value)}>{value}</li>
          ))
        }
      </ul>
      <YoutubeResources key={"Yotube_videos"} />
      <AddResourceModal open={openAddModal} setOpen={setOpenAddModal}/>
    </div>
  )
}


export default ResourceHomePage