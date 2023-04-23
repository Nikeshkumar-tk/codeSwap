import Modal from '@/components/Modal'
import { useState, useEffect } from 'react'

const ResourceHomePage = () => {
  const [hydrated, setHydrated] = useState<boolean>()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [openAddModal, setOpenAddModal] = useState<boolean>(true)
  const tabValues:string[] = ["Youtube videos", "Articles"]
  useEffect(() => {
    setHydrated(true)
  })
  if (!hydrated) return null
  return (
    <div className='py-20 px-8 sm:px-20'>
      <div className='w-full flex justify-between'>
      <h1 className='text-2xl font-semibold '>Explore resources</h1>
      <button className='rounded-md border border-gray-600 px-3.5 py-1 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-300'>Add new</button>
      </div>
      {/* <div className='w-full h-1 rounded-full bg-gray-100 mt-5'></div> */}
      <ul className='flex gap-3 mt-3'>
        {
          tabValues.map((value:string) => (
            <li className={`hover:bg-indigo-700 flex items-center whitespace-nowrap font-medium text-[20px] ${selectedCategory === value && "text-indigo-700"} hover:text-white rounded-full px-3 py-1.5 cursor-pointer`} onClick={() => setSelectedCategory(value)}>{value}</li>
          ))
        }
      </ul>
      <Modal open={openAddModal} setOpen={setOpenAddModal}>
        <h1>Hello testing modal</h1>
      </Modal>
    </div>
  )
}

export default ResourceHomePage