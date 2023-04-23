"use client"
import { AiFillGithub, AiOutlineMenu } from 'react-icons/ai'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { ISessionUser } from '@/lib/interfaces/user';
interface Props {

    drawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    menuBtnRef?: any
}
const NavBar = ({ drawerOpen, menuBtnRef }: Props) => {
    const { status, data } = useSession()
    const sessionUser = data?.user as ISessionUser
    console.log("Printing session user", sessionUser)
    return (
        <nav className='px-10 bg-white sm:px-20 mx-auto py-5 fixed  w-screen z-10'>
            <div className='absolute left-3 sm:left-8 top-[40%] font-bold cursor-pointer' onClick={() => drawerOpen(p => !p)}>
                <AiOutlineMenu />
            </div>
            <div className='flex justify-between whitespace-nowrap items-center'>
                <div className='flex items-center gap-2'>
                    <Link href={"/"}> <h2 className='text-2xl font-bold'>code<span className='bg-[#4f46e5] text-white rounded-full px-2'>Swap</span> </h2></Link>
             <button className='border border-blue-900 px-3 rounded-md'>Beta</button>
                </div>
                <div className='flex gap-10 items-center'>

                    <ul className='hidden sm:flex gap-5 '>
                        <Link href={"/courses"}><li className='cursor-pointer'>Courses</li></Link>
                        <Link href={"/blogs"}><li className='cursor-pointer'>Blogs</li></Link>      
                        <li className='cursor-pointer'>Subscriptions</li>
                        <li className='cursor-pointer'>Projects</li>
                    </ul>
                    <div className='flex items-center sm:gap-5'>
                 <a href="https://github.com/Nikeshkumar-tk/codeSwap" className='hidden sm:inline-block' target='_blank'><AiFillGithub size={35}/></a>   
                        {
                            status === "unauthenticated" ? <Link href={"auth/signin"}>
                                <button className='rounded-md border border-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-indigo-300'>
                                    SignIn
                                </button>
                            </Link> : (
                                <div className='flex items-center'>
                                    <img src={sessionUser?.image} className='rounded-full h-8 w-8' alt=''/>
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