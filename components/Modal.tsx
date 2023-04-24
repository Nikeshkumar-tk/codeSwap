import React, { SetStateAction } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface Props{
    children:React.ReactNode
    open:boolean
    setOpen:React.Dispatch<SetStateAction<boolean>>
    heading?:string
}
const Modal = (props:Props) => {
  return (
    <div className={`${!props.open ? "hidden" : "block"} absolute top-0 left-0 h-screen bg-modalBackground w-full flex items-center justify-center`}>
       <div  className='px-5 shadow-lg py-5 bg-white z-10 rounded-md'>
       <div className='flex justify-between w-full items-center'>
        <p className='font-semibold font-sans'>{props.heading}</p>
        <AiOutlineClose onClick={() => props.setOpen(false)} className='cursor-pointer hover:text-indigo-700'/>
       </div>
       {
        props.children
        }
       </div>
    </div>
  )
}

export default Modal