import Modal from '@/components/Modal'
import { PrimaryButton } from '@/components/globals/Buttons'
import YouTubePlayer from '@/components/globals/YouTubePlayer'
import { useConfigService } from '@/lib/clientApiServices/config'
import { ROOT_CONFIGS_IDS } from '@/lib/shared/enums'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import {GetServerSidePropsContext } from 'next'
import axios from 'axios'
import YoutubeResources from '@/components/YoutubeResources'

const ResourceHomePage = ({resourceData}:any) => {
  const [hydrated, setHydrated] = useState<boolean>()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [studyResourceTypes, setStudyResourceTypes] = useState<any[]>([])
  const configService = useConfigService()
  const tabValues: string[] = ["Youtube videos", "Articles"]
  console.log('printing from server', resourceData)
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
    <div className='py-20 px-8 sm:px-20'>
      <div className='w-full flex justify-between'>
        <h1 className='text-2xl font-semibold '>Explore resources</h1>
        <button onClick={() => setOpenAddModal(true)} className='rounded-md border border-gray-600 px-3.5 py-1 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-300'>Add new</button>
      </div>
      <ul className='flex gap-3 mt-3'>
        {
          tabValues.map((value: string) => (
            <li key={value} className={`hover:bg-indigo-700 flex items-center whitespace-nowrap font-sans text-[18px] ${selectedCategory === value && "text-indigo-700"} hover:text-white rounded-full px-3 py-1.5 cursor-pointer`} onClick={() => setSelectedCategory(value)}>{value}</li>
          ))
        }
      </ul>
      <YoutubeResources key={"Yotube_videos"} data={resourceData}/>
      <Modal open={openAddModal} setOpen={setOpenAddModal} heading='Add new resource'>
        <div className='w-80 mt-5'>
          <select placeholder='Select type' className='h-10  w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900'>
            {
              studyResourceTypes?.map((type: any) => (
                <option className='py-2 h-10' value={type.id} key={type.id}>{type.name}</option>
              ))
            }
          </select>
          <input
            className="flex h-10 w-full mt-3 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
            type="text"
            placeholder="Enter heading..." />
          <textarea
            className="flex min-h-20 w-full mt-3 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
            placeholder="Enter heading..." />
             <input
            className="flex h-10 w-full mt-3 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
            type="url"
            placeholder="Enter the url..." />
            <div className='mt-3 flex justify-end'>
            <PrimaryButton >Submit</PrimaryButton>
            </div>
        </div>
      </Modal>
    </div>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const response  = await axios.get("http://localhost:3000/api/resource?typeId=youtubeVideo")
  return {
    props: {
      resourceData:response.data
    }, // will be passed to the page component as props
  }
}
export default ResourceHomePage