import React from 'react'
type ChatChipType = {
    message:string,
    email:string
}
const ChatChip = (props:ChatChipType) => {
    const {message, email} = props
  return (
    <div className='bg-blue-700 rounded-full text-white px-3 py-2'>{message}</div>
  )
}

export default ChatChip