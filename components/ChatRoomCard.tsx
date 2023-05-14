import { useState } from "react"
import { AiFillCloseCircle, AiFillLock, AiOutlineClose } from "react-icons/ai"
import { TiTick } from "react-icons/ti"
import { HiStatusOnline } from "react-icons/hi"
interface Props {
  topic: string,
  id: string,
  host: string
  joinedMembers: number
  secured: boolean
  description: string
  hostName: string
  hostEmail: string
}

const ChatRoomCard = (props: Props) => {
  const { topic, host, id, joinedMembers, secured, description, hostEmail, hostName } = props
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [disabledJoinBtn, setDisabledJoinBtn] = useState<boolean>(false)
  const [selectedChatRoom, setSelcetedChatRoom] = useState<any>({})
  function handleJoinRoom() {
    setModalOpen(true)
    if(secured) setDisabledJoinBtn(true)
  }

  return (
    <div className="border border-gray-300 w-56 h-40 rounded px-4 py-5 hover:shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">{topic}</h1>
      </div>
      <div className="flex justify-between items-center mt-16">
        <div className="flex gap-1 items-center">
          {secured && <AiFillLock />}
          <p className="text-sm">Online {joinedMembers}</p>
        </div>
        <button onClick={handleJoinRoom} className="uppercase border rounded px-3 text-sm border-blue-600 text-blue-600">join</button>
      </div>



      {/* Room joining modal with details of the room */}

      <div className={`absolute ${modalOpen ? "grid" : "hidden"}  place-content-center h-screen bg-modalBackground w-full z-20 top-0 left-0`}>
        <div className="bg-white rounded-md px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <h1 className="font-bold text-2xl flex items-center">Join room</h1>
            </div>
            <AiOutlineClose onClick={() => setModalOpen(false)} className="cursor-pointer hover:text-gray-500" />
          </div>
          <div className="gap-1 flex items-center mt-3">
            <p className="text-sm">Secured</p>
            {secured ? <TiTick /> : <AiFillCloseCircle />}
          </div>
          <div className="mt-4">
            <h1 className="font-semibold">Topic - {topic}</h1>
            <h1 className="font-semibold mt-2">Description - {description}</h1>
            <h1 className="font-semibold mt-2 flex items-center gap-1"><HiStatusOnline />Online - {joinedMembers}</h1>
            <h1 className="font-semibold mt-2">Host name - {hostName}</h1>
            <h1 className="font-semibold mt-2">Host email - {hostEmail}</h1>
          </div>
          {
            secured &&  <div className="flex mt-4">
            <input type="text" placeholder="Enter the pass code" className="focus-within:border-blue-600 outline-none border rounded px-2 py-1 border-gray-400" />
          </div>
          }
         
          <div className="flex justify-end mt-4">
            <button disabled={disabledJoinBtn} className={`${!disabledJoinBtn ? "bg-blue-800" : "bg-gray-400" } text-white rounded uppercase px-4 py-[7px]`}>Join</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatRoomCard