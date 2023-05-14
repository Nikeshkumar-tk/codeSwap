import React, {useState, useEffect} from "react";
import {
    HomeIcon,
    ChartBarIcon,
    CommandLineIcon,
    UserGroupIcon,
    WrenchScrewdriverIcon,
    ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoIosArrowBack } from 'react-icons/io'
import { BsChat } from 'react-icons/bs'
import { useRouter } from "next/router";
import Link from "next/link";
interface Props {
    drawerOpen: boolean
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const Sidebar = (props: Props) => {
    const { data, status } = useSession()
    const [hydrated, setHydrated] = useState<boolean>(false)
    useEffect(() => {
        setHydrated(true)
    }, [])
    if(!hydrated) return null
    return (
        <div onBlur={() => props.setDrawerOpen(false)} className={`flex top-0 ${props.drawerOpen ? "-left-[0px]" : "-left-[260px]"} flex-col w-64 overflow-y-hidden px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l absolute overflow-hidden dark:bg-gray-900 dark:border-gray-700 h-screen transition-all duration-75 z-20 `}>
            <div className="flex justify-end">

                <IoIosArrowBack onClick={() => props.setDrawerOpen(false)} className="cursor-pointer dark:text-white" />
            </div>
            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="flex-1 -mx-3 space-y-3 ">
                    <a
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        href="#"
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span className="mx-2 text-sm font-medium">Home</span>
                    </a>
                    <a
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        href="#"
                    >
                        <ChartBarIcon className="w-5 h-5" />
                        <span className="mx-2 text-sm font-medium">Dashboard</span>
                    </a>
                    <Link 
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        href="/chatRooms"
                    >
                        <BsChat className="w-5 h-5" />
                        <span className="mx-2 text-sm font-medium">Chat rooms</span>
                    </Link>
                    <div
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                       
                    >
                        <UserGroupIcon className="w-5 h-5" />
                       <Link href={"/blogs"}><span className="mx-2 text-sm font-medium">Blogs</span></Link> 
                    </div>

                    <div
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        
                    >
                        <WrenchScrewdriverIcon className="w-5 h-5" />
                      <Link href={"/resources"}><span className="mx-2 text-sm font-medium">Resources</span></Link>  
                    </div>
                    <a
                        className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                        href="#"
                    >
                        <WrenchScrewdriverIcon className="w-5 h-5" />
                        <span className="mx-2 text-sm font-medium">Setting</span>
                    </a>
                </nav>
                <div className="">
                    {
                        status === "unauthenticated" ?
                            <div className="flex w-full  justify-end">
                                <button onClick={() => signIn()} className="bg-transparent border-blue-500 border dark:text-white rounded-md px-4 py-1 self-end">Login</button>
                            </div>
                            : (
                                <div className="flex items-center justify-between">
                                    <a href="#" className="flex items-center gap-x-2">
                                        <img
                                            className="object-cover rounded-full h-7 w-7"
                                            src={data?.user?.image!}
                                            alt="avatar"
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {data?.user?.name}
                                        </span>
                                    </a>
                                    <div className="text-gray-500 cursor-pointer transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400">
                                        <ArrowLeftOnRectangleIcon className="h-5 w-5" onClick={() => signOut()} />
                                    </div>

                                </div>
                            )

                    }

                </div>
            </div>
        </div>
    );
};

Sidebar.displayName = "Sidebar";
