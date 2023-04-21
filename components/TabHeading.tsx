import React from 'react'

interface Props{
    children: React.ReactNode
}
const TabHeading = (props:Props) => {
  return (
    <div className='font-semibold cursor-pointer'>{
        props.children
        
        }</div>
  )
}

export default TabHeading