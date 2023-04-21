import { useBlogservice } from '@/lib/clientApiServices/blog'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { MutatingDots, Triangle } from 'react-loader-spinner'
import React, { useRef, useState } from 'react'

const CreateBost = () => {
  const { status, data } = useSession()
  const [image, setImage] = useState<any | undefined>()
  const [uploading, setUploading] = useState<boolean>(false)
  const titleRef = useRef<any>()
  const descriptionRef = useRef<any>()
  const router = useRouter()
  const blogServices = useBlogservice()
  if (status === "unauthenticated") {
    router.push("/api/auth/signin")
  }
  async function handleSubmit() {
    setUploading(true)
    const blogObj: any = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      userEmail: data?.user?.email,
      username: data?.user?.name,
    }
    if (image) {
      blogObj.imageData = {
        image: image[0],
        fileName: Date.now() + image[0].name
      }
    }
    const response = await blogServices.createBlog(blogObj)
    if (response.status === 200) {
      router.push("/blogs")
    }
    setUploading(false)
  }

  return (
    <>
      {
        uploading ? <div className='h-screen flex items-center justify-center'>
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div> : (
          <div className='px-8 sm:px-20 mt-4 flex flex-col'>
            <div className='self-end flex w-full justify-end items-center'>
              {/* <div>
                <label htmlFor="blogImage" className='cursor-pointer whitespace-nowrap bg-blue-600 rounded px-3 text-white py-1'>
                  Upload img
                </label>
                <input type="file" id='blogImage' className='hidden' onChange={(e) => setImage(e.target.files)} />
              </div> */}
              <button className='bg-pink-200 rounded-lg h-10 w-20' onClick={() => handleSubmit()}>
                Publish
              </button>
            </div>
            <div className='flex flex-col gap-5'>
              <input type="text" ref={titleRef} placeholder='Enter your title' className='placeholder:text-4xl outline-none text-4xl h-20' />
              <textarea ref={descriptionRef} placeholder='Enter your content' className='text-1xl placeholder:text-2xl text-2xl outline-none' />
            </div>
          </div>
        )
      }
    </>
  )
}

export default CreateBost