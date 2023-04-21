import { useBlogservice } from '@/lib/clientApiServices/blog'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useQuery } from 'react-query'
import BlogCard from './BlogCard'
import { Dna } from 'react-loader-spinner'

const Blog = () => {
  const blogServices = useBlogservice()
  const [blogs, setBlogs] = useState<any[]>([])
  const { isLoading: loadingBlogs } = useQuery({
    queryKey: 'blogs',
    queryFn: blogServices.getBlogList,
    onSuccess: (response) => setBlogs(response.data)
  })
  return (
    <div className='h-full'>
      <Link href={"/createBlog"} >
        <div className=' py-3'>
          <button className='border-blue-600 border flex items-center gap-2 text-black rounded-md px-4 py-1'>
            Create
            <span>
              <AiOutlinePlus size={20} />
            </span>
          </button>
        </div>
      </Link>
      <div className='grid py-5 sm:grid-cols-3 gap-y-4 gap-x-3 max-h-screen mt-1 overflow-y-scroll'>
        {
          loadingBlogs ? <div className='h-full w-screen flex justify-center items-center'>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div> :
            blogs.map((blog: any) => (

              <BlogCard title={blog.title} description={blog.description} image={blog.imageUrl} author={blog.username} key={blog.title} />

            ))
        }
      </div>
    </div>
  )
}

export default Blog