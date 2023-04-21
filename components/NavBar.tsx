"use client"
import { AiOutlineMenu } from 'react-icons/ai'
import { TbBeta } from "react-icons/tb"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
interface Props {

    drawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    menuBtnRef?: any
}
const NavBar = ({ drawerOpen, menuBtnRef }: Props) => {
    const { status, data } = useSession()
    return (
        <nav className='px-10 sm:px-20 mx-auto py-5 fixed  w-screen z-10'>
            <div className='absolute left-3 sm:left-8 top-[40%] font-bold cursor-pointer' onClick={() => drawerOpen(p => !p)}>
                <AiOutlineMenu />
            </div>
            <div className='flex justify-between whitespace-nowrap items-center'>
                <div className='flex items-center gap-2'>
                    <Link href={"/"}> <h2 className='text-2xl font-bold'>code<span className='bg-pink-200 rounded-full px-2'>Swap</span> </h2></Link>

                </div>
                <div className='flex gap-10 items-center'>

                    <ul className='hidden sm:flex gap-5 '>
                        <Link href={"/resources"}><li className='cursor-pointer'>Resources</li></Link>
                        <li className='cursor-pointer'>Courses</li>
                        <li className='cursor-pointer'>Subscriptions</li>
                        <li className='cursor-pointer'>Projects</li>
                    </ul>
                    <div className='flex items-center gap-3'>
                        {
                            status === "unauthenticated" ? <Link href={"auth/signin"}>
                                <button className='bg-[#0074D9] rounded-md px-3 py-1 text-white'>
                                    SignIn
                                </button>
                            </Link> : (
                                <div className='flex items-center'>
                                    <img src={data?.user?.image!} className='rounded-full h-8 w-8' />
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </nav>

    )
}

export default NavBar