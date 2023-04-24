import { useResourceService } from '@/lib/clientApiServices/blog'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Loading from './Loading'

const Courses = () => {
  const services = useResourceService()
  const [courses, setCourses] = useState<any>([])
  const { isLoading: loadingCourses } = useQuery({
    queryKey: 'resources',
    queryFn: services.getResourceList,
    onSuccess: (response) => {
      setCourses(response.data)
    }
  })
  return (
    <>
      {
        loadingCourses ? <Loading text='Loading resources...'/> : (
          <div className='px-5 py-20 sm:px-20'>
            <h1 className='text-2xl whitespace-nowrap  font-semibold'>Available courses for beginners</h1>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">

              {
                courses.map((course: any, index: number) => (
                  <div
                    key={course.id}
                    className="rounded overflow-hidden shadow-lg dark:shadow-gray-800"
                  >
                    <img className="w-full" src={course.imageUrl} alt="Mountain" />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{course.courseName}</div>
                      <p className="text-gray-700 dark:text-gray-300 text-base">
                        {course.description.substring(0, 100)}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }

    </>
  )
}

export default Courses