"use client"
import { AiFillGithub, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import Image from 'next/image';
interface Props {

    drawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    menuBtnRef?: any
}
const NavBar = ({ drawerOpen, menuBtnRef }: Props) => {
    const { status, data } = useSession()
    return (
        <nav className="fixed z-10 w-full bg-white">
            <div className='container mx-auto flex px-10 sm:px-20 py-8 justify-between'>
                <div className='flex gap-10 items-center relative'>
                    <AiOutlineMenu className='absolute -left-6 sm:-left-10 top-[38%] cursor-pointer' onClick={() => drawerOpen(p => !p)} />
                    <Link href={"/"}> <h2 className='text-2xl leading-5 font-bold'>code<span className='bg-[#4f46e5] text-white rounded-full px-2'>Swap</span> </h2></Link>
                    <ul className=' space-x-6 hidden sm:flex'>
                        <Link href={"/resources"}><li className='flex items-center font-semibold text-lg cursor-pointer'>Resources</li></Link>
                        <Link href={"/blogs"}><li className='flex items-center font-semibold text-lg cursor-pointer'>Blogs</li></Link>
                        <Link href={"/aboutUs"}><li className='flex items-center font-semibold text-lg cursor-pointer'>About us</li></Link>
                    </ul>
                </div>
                <div className="flex items-center gap-5">
                   
                    {status === "authenticated" && <Image src={data?.user?.image!} height={40} width={40} alt='profile' className='rounded-full' />}
                    {status !== "authenticated" ? <button
                        onClick={() => signIn()}
                        className='inline-block text-white rounded-full bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                    >Login</button> : <button
                        onClick={() => signOut()}
                        className='uppercase hidden border-[1.9px] border-red-500 sm:inline-block rounded-md text-xs text-red-600 font-semibold py-1.5 px-3'>sign out</button>}
                </div>
            </div>
        </nav>

    )
}

export default NavBar