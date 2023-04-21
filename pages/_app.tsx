import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, signOut } from "next-auth/react"
import { QueryClientProvider, QueryClient } from 'react-query'
import NavBar from '@/components/NavBar'
import { useRef } from 'react'
import { Sidebar } from '@/components/SideBar'
import { useState } from 'react'
import { useRouter } from 'next/router'

const queryClient = new QueryClient()

export default function App({ session, Component, pageProps }: AppProps | any) {
  const btnRef = useRef<any>()
  const router = useRouter()
  const currentPath = router.asPath
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  
  return (<SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
      {currentPath !== "/auth/signin" && (
<>
<NavBar drawerOpen={setDrawerOpen} menuBtnRef={btnRef} />
<Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
</>
      )}
        <div className=''>
        <Component {...pageProps} />
        </div>
    </QueryClientProvider>
  </SessionProvider>
  )
}
