import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import Waring from '@/components/Waring';
import Hero from '@/components/Hero';


export default function Home(props: any) {
  const { status} = useSession()
  const [hydrated, setHydrated] = useState<boolean>(false)
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(true)
  
  useEffect(() => {
    setHydrated(true)
  },[])
  if (!hydrated) return null
  return (
    <div>
      <div className='px-8 sm:px-20'>        
       <Hero />
      </div>
      <Waring open={warningModalOpen} setOpen={setWarningModalOpen} message={"Testing warning"} />
    </div>
  )
}


