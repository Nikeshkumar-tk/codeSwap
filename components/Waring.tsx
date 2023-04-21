
import { Dispatch, SetStateAction } from 'react'

interface Props{
    open:boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    message:string
}
const Waring = (props:Props) => {
    const { open,setOpen } = props
    return (
        <div>  
            </div>
    )
}

export default Waring