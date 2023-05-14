import { APP_ROLES, ROOT_CONFIGS_IDS } from '@/lib/shared/enums'
import { useState, useEffect } from 'react'
import YoutubeResources from '@/components/YoutubeResources'
import AddResourceModal from '@/components/modals/AddResource'
import { useSession } from 'next-auth/react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Articles from '@/components/Articles'
import { AiOutlineSearch } from 'react-icons/ai'

const ResourceHomePage = () => {
  const [hydrated, setHydrated] = useState<boolean>()
  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const { data: userInfo, status } = useSession()

  useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) return null
  console.log("user info", userInfo)
  return (
    <div className='px-8 sm:px-20 pt-28'>
      <div className="flex justify-start items-center">

        <div className="flex items-center justify-between focus-within:border-gray-500 border rounded w-96 px-2 py-1.5 mb-3">
          <input type="text" className='outline-none rounded flex-1' placeholder='Search any thing...' />
          <AiOutlineSearch className='cursor-pointer' size={20} />
        </div>
      </div>
      <Tabs>
        <TabList>
          <div className=''>
            <Tab>Youtube videos</Tab>
            <Tab>Articles</Tab>
          </div>
        </TabList>
        {
          // @ts-ignore
          userInfo?.user?.role === APP_ROLES.ADMIN &&
          <div className='flex justify-end'>
            <button
              onClick={() => setOpenAddModal(true)}
              className='uppercase hover:shadow-md transition-colors text-sm text-white bg-blue-700 px-2 py-1.5 rounded-sm font-semibold'>add new</button>
          </div>
        }
        <TabPanel>
          <YoutubeResources key={"Yotube_videos"} />
        </TabPanel>
        <TabPanel>
          <Articles />
        </TabPanel>
      </Tabs>
      <AddResourceModal open={openAddModal} setOpen={setOpenAddModal} />
    </div>
  )
}


export default ResourceHomePage