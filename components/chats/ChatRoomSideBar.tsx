import React from 'react'

const ChatRoomSideBar = () => {
  return (
    <div className='h-screen border rounded px-5 py-5 w-60'>
        <ul className='flex flex-col gap-5'>
            <li className='text-lg cursor-pointer'>React</li>
            <li className='text-lg cursor-pointer'>Node js</li>
            <li className='text-lg cursor-pointer'>Web development</li>
            <li className='text-lg cursor-pointer'>Machine learning</li>
            <li className='text-lg cursor-pointer'>Python</li>
            <li className='text-lg cursor-pointer'>Ai</li>
        </ul>
    </div>
  )
}

export default ChatRoomSideBar