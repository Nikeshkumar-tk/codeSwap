import React, { SetStateAction } from 'react'

interface Props{
    children:React.ReactNode
    open:boolean
    setOpen:React.Dispatch<SetStateAction<boolean>>
}
const Modal = (props:Props) => {
  return (
    <div className={`${!props.open ? "hidden" : "block"} absolute top-0 left-0 h-screen bg-gray-500 bg-opacity-75 w-full flex items-center justify-center`}>
       <div onBlur={() => console.log("blurred")}  className='px-5 shadow-lg py-5 bg-white z-10 rounded-md'>
       {
        props.children
        }
       </div>
    </div>
  )
}

export default Modal