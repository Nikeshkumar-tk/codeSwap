import Blog from '@/components/Blog'
import { getServerSession } from 'next-auth'
import React, { useState, useEffect } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import { GetServerSidePropsContext } from 'next'

const Index = () => {
    const [hydrated, setHydrated] = useState<boolean>(false)
    useEffect(() => {
        setHydrated(true)
    }, [])
    if (!hydrated) return null
    return (
        <div className='px-8 sm:px-20 py-20'>
            <Blog />
        </div>
    )
}

export default Index