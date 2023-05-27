import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueries, useQueryClient } from 'react-query'
import { useChatServices } from '@/lib/clientApiServices/chat'
import { AxiosResponse } from 'axios'
import type { RequestBody as MessageType } from '../api/chats/sendMessage'
import { BiSend } from "react-icons/bi"
import ChatChip from '@/components/chats/ChatChip'
import { useSession } from 'next-auth/react'
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatPage = () => {
    const [chats, setChats] = useState<MessageType[] | null>([])
    const messageRef = useRef<any>()
    const { query } = useRouter()
    const chatServices = useChatServices()
    const { data: userData } = useSession()
    const queryClient = useQueryClient()
    useQueries([{
        queryKey: [query.chatId],
        queryFn: async () => {
            return await chatServices.getChats(query.chatId as string)
        },
        onSuccess: ({ data }: AxiosResponse) => setChats(data),
        onError: (error: any) => console.log(error),
        refetchInterval: 5000
    }])

    const { mutate: sendMessage } = useMutation({
        mutationFn: chatServices.sendMessage,
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries(query.chatId)
        }
    })


    const handleSendMessage = async function () {
        const newMessageObj: MessageType = {
            email: userData?.user?.email!,
            message: messageRef.current.value,
            roomId: query.chatId as string
        }

        sendMessage(newMessageObj)
        messageRef.current.value = null

    }
    return (
        <div className='flex justify-center items-center pt-20 h-screen '>
            <div className='h-[35rem] sm:h-[38rem] w-[45rem] rounded-lg shadow-lg px-5 py-3 flex flex-col'>
                <h1 className='font-bold text-2xl'>Chat</h1>
                <div className="w-full h-[1.5px] rounded-full bg-gray-600"></div>
                <ScrollToBottom className='relative flex-1 flex flex-col mt-1 overflow-scroll'>
                    <div className='flex-1 flex flex-col w-full gap-1 overflow-y-scroll'>
                        {
                            chats?.map((chat: MessageType) => (
                                <div className={`${userData?.user?.email === chat.email ? "self-end" : "self-start"} relative`} key={chat.message}>
                                    {userData?.user?.email !== chat.email && chat.email}
                                    <ChatChip owner={userData?.user?.email === chat.email} email={chat.email} message={chat.message} />
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <input type="text" ref={messageRef} placeholder='Enter something...' className='border-none outline-none border-b-2 w-full' onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}/>
                        <BiSend onClick={handleSendMessage} className='cursor-pointer'/>
                    </div>
                </ScrollToBottom>
            </div>

        </div>
    )
}

export default ChatPage