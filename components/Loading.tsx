import React from 'react'
import { MutatingDots } from 'react-loader-spinner'
interface Props{
    text?:string
}
const Loading = (props:Props) => {
    return (
        <div className='flex items-center justify-center absolute w-screen top-0 left-0 h-screen'>
            <div className='flex flex-col items-center'>
            <MutatingDots
                height="100"
                width="100"
                color="#4f46e5"
                secondaryColor='#4f46e5'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <span>{props.text}</span>
            </div>
        </div>
    )
}

export default Loading