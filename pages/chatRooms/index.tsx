import { useChatServices } from "@/lib/clientApiServices/chat";
import { useQuery } from "react-query";
import { useState } from "react"
import ChatRoomCard from "@/components/ChatRoomCard";
import { AiFillCloseCircle, AiFillLock, AiOutlineClose } from "react-icons/ai"
import {TiTick} from "react-icons/ti"
import {HiStatusOnline} from "react-icons/hi"
const ChatHomePage = () => {
    const [chatRooms, setChatRooms] = useState<any[]>([])
    const [selectedChatRoom, setSelectedChatRoom] = useState<any>({})
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const chatServices = useChatServices()

   const {isLoading} =  useQuery({
        queryKey: ["getChatRooms"],
        queryFn: chatServices.getRooms,
        onSuccess: (response) => setChatRooms(response.data)
    })
    return (
        <div className="pt-28 text-black px-10 sm:px-20 ">
            <h1 className="text-2xl font-semibold">Chat rooms</h1>
            <div className="mt-10 grid w-full place-items-center sm:grid-cols-5">

            {
                chatRooms.map((room) => (
                    <ChatRoomCard 
                    topic={room.topic} 
                    id={room.id} 
                    host={room.host}
                    joinedMembers={room.joinedMembers}
                    secured={room.secured}
                    description={room.description}
                    hostName={room.hostName}
                    hostEmail={room.hostEmail}
                    key={room.id}
                    />
                ))
            }
            </div>
            <div className={`absolute ${modalOpen ? "grid" : "hidden" }  place-content-center h-screen bg-modalBackground w-full z-20 top-0 left-0`}>
        <div className="bg-white w-80 h-80 rounded-md px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
            <h1 className="font-bold text-2xl flex items-center">Join room</h1>
            </div>
            <AiOutlineClose onClick={() => setModalOpen(false)} className="cursor-pointer hover:text-gray-500" />
          </div>
          <div className="gap-1 flex items-center mt-3">
          <p className="text-sm">Secured</p>
          {selectedChatRoom.secured ? <TiTick /> : <AiFillCloseCircle />}
          </div>
          <div className="mt-4">
          <h1 className="font-semibold">Topic - {selectedChatRoom.topic}</h1>
          <h1 className="font-semibold mt-2">Description - {selectedChatRoom.description}</h1>
          <h1 className="font-semibold mt-2 flex items-center gap-1"><HiStatusOnline />Online - {selectedChatRoom.joinedMembers}</h1>
          </div>
          {
            selectedChatRoom.secured && 
          <div className="flex mt-4">
            <input type="text" placeholder="Enter the pass code" className="focus-within:border-blue-600 outline-none border rounded px-2 py-2 border-gray-400"/>
          </div>
          }
          <div className="flex justify-end">
            <button disabled className="bg-blue-800 text-white rounded uppercase px-4 py-[7px]">Join</button>
          </div>
        </div>
      </div>
        </div>
    )

}

export default ChatHomePage;