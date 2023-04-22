import React from 'react'
interface Props{
    title:string
    description:string
    image?:string,
    author?:string
}

const BlogCard = (props:Props) => {
    const {title,description,image, author} = props
  return (
    <div className='flex flex-col shadow-md hover:scale-105 transition-all border  rounded-md  px-3 py-2'>
      {image && <img src={image} className='w-full'/>}
        <h2 className='font-semibold text-2xl'>{title}</h2>
        <p>{description}</p>
        <footer className='self-start font-semibold mt-3'>{author === "Nikesh Kumar" ? "Admin" : author}</footer>
    </div>
  )
}

export default BlogCard