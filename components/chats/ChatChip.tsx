import React from 'react'
type ChatChipType = {
    message:string,
    email:string
    owner:boolean
}
const ChatChip = (props:ChatChipType) => {
    const {message, email, owner} = props
  return (
    <div className={`${owner ? "bg-blue-700 text-white" : "bg-white text-black border-gray-400 border"} rounded-full px-3 py-2`}>{message}</div>
  )
}

export default ChatChip