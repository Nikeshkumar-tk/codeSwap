import React from 'react'
interface Props {
    tabHeadings: string[]
    tabValue: number
    setTabValue: (value: number) => void
}
const TabHeader = (props: Props) => {
    return (
        <div className='flex gap-5 items-center'>
            {
                props.tabHeadings.map((heading: string, index:number) => (
                    <h2 key={heading} onClick={() => props.setTabValue(index)} 
                    className={`cursor-pointer  rounded-full px-4 py-1 ${props.tabValue === index && "bg-red-300"}`}>{heading}</h2>
                ))
            }

        </div>
    )
}

export default TabHeader