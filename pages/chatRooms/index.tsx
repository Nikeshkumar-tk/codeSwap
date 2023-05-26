import { ChatServices, useChatServices } from "@/lib/clientApiServices/chat";
import { useQuery } from "react-query";
import { useState, useEffect } from "react"
import ChatRoomCard from "@/components/ChatRoomCard";
import { AiFillCloseCircle, AiFillLock, AiOutlineClose } from "react-icons/ai"
import { TiTick } from "react-icons/ti"
import { HiStatusOnline } from "react-icons/hi"
import type { RequestBody as Chat } from "../api/chats/sendMessage";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
const ChatHomePage = () => {
    const [chatRooms, setChatRooms] = useState<any[]>([])
    const [selectedChatRoom, setSelectedChatRoom] = useState<any>({})
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [hydrated, setHydrated] = useState<boolean>(false)
    const chatServices = useChatServices()
    const { isLoading } = useQuery({
        queryKey: ["getChatRooms"],
        queryFn: chatServices.getRooms,
        onSuccess: (response) => setChatRooms(response.data)
    })
    useEffect(() => {
        setHydrated(true)
    }, [])
    if (!hydrated) return null
    return (
        <div className="pt-28 text-black px-10 sm:px-20 ">
            <h1 className="text-2xl font-semibold">Chat rooms</h1>
            <div className="mt-10 grid w-full place-items-center sm:grid-cols-5 gap-y-3">

                {
                    chatRooms.map((room: any) => (
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
                            members={room.members}
                        />
                    ))
                }
            </div>
        </div>
    )

}

export default ChatHomePage;

