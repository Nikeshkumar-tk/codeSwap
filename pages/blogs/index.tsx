import Blog from '@/components/Blog'
import React, { useState, useEffect } from 'react'

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