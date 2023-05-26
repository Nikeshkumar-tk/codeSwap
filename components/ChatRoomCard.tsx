import { useState } from "react"
import { AiFillCloseCircle, AiFillLock, AiOutlineClose } from "react-icons/ai"
import { TiTick } from "react-icons/ti"
import { HiStatusOnline } from "react-icons/hi"
import { title } from "process"
import Link from "next/link"
interface Props {
  topic: string,
  id: string,
  host: string
  joinedMembers: number
  secured: boolean
  description: string
  hostName: string
  hostEmail: string
  members: any
}

const ChatRoomCard = (props: Props) => {
  const { topic, host, id, members, joinedMembers, secured, description, hostEmail, hostName } = props
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [disabledJoinBtn, setDisabledJoinBtn] = useState<boolean>(false)
  const [selectedChatRoom, setSelcetedChatRoom] = useState<any>({})
  function handleJoinRoom() {
    setModalOpen(true)
    if (secured) setDisabledJoinBtn(true)
  }
  console.log(members)
  return (
    <div className="bg-white shadow-lg rounded-md w-64 p-4 hover:shadow-xl">
    <div className="flex justify-between">
      <h1 className="text-lg font-semibold uppercase">{topic}</h1>
      {secured && <AiFillLock className="text-gray-600" />}
    </div>
    <p className="text-sm text-gray-500 mt-1">Joined {members?.length}</p>
    <div className="flex justify-end mt-4">
     <Link href={`/chatRooms/${id}`}><button className="uppercase px-4 py-2 bg-indigo-700 text-white rounded-full text-sm font-medium hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800">
        Join
      </button></Link> 
    </div>
  </div>
  
  )
}

export default ChatRoomCard