import { useBlogservice } from '@/lib/clientApiServices/blog'
import Link from 'next/link'
import { useState, useContext } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useQuery } from 'react-query'
import BlogCard from './BlogCard'
import { useSession } from 'next-auth/react'
import { ISessionUser } from '@/lib/interfaces/user'
import { memo } from "react"
import Loading from './Loading'
import { UserContext } from '@/context/User'
const Blog = memo(({ session }: any) => {
  const blogServices = useBlogservice()
  const [blogs, setBlogs] = useState<any[]>([])
  const { status, data } = useSession()
  const sessionUser = data?.user as ISessionUser
  const { role } = useContext(UserContext)
  console.log("Printing role from context", role)
  const { isLoading: loadingBlogs } = useQuery({
    queryKey: 'blogs',
    queryFn: blogServices.getBlogList,
    onSuccess: (response) => setBlogs(response.data)
  })
  let load = true
  return (
    <div className='h-full mt-10'>
      {
        sessionUser?.role === "admin" &&
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

      }
      <div>
        <h1 className='text-4xl font-semibold flex justify-center whitespace-nowrap text-indigo-800'>Blogs</h1>
      </div>
      {
        loadingBlogs ?
          <Loading />
          :
          <div className='grid  py-5 sm:grid-cols-3 gap-y-4 gap-x-3 max-h-screen mt-5 overflow-y-scroll'>

            {
              blogs.map((blog: any) => (

                <BlogCard title={blog.title} description={blog.description} image={blog.imageUrl} author={blog.username} key={blog.title} />

              ))
            }
          </div>

      }
    </div>
  )
}
)
Blog.displayName = "Blog"
export default memo(Blog)