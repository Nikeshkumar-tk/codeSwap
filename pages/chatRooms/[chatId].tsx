import React from 'react'
import { useRouter } from 'next/router'
import { useQueries } from 'react-query'
import { useChatServices } from '@/lib/clientApiServices/chat'
import { AxiosResponse } from 'axios'
const ChatPage = () => {
    const { query } = useRouter()
    const chatServices = useChatServices()
    useQueries([{
        queryKey:[query.chatId],
        queryFn:async () => {
            return await chatServices.getChats(query.chatId as string)
        },
        onSuccess:({data}:AxiosResponse) => console.log(data),
        onError:(error:any) => console.log(error)
    }])
    return (
        <div className='flex justify-center items-center pt-20 h-screen'>
            <div>
                <h1>Chat</h1>
                <div>

                </div>
            </div>

        </div>
    )
}

export default ChatPage