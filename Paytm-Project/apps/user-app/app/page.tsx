"use client"
import React from 'react'
import { Button } from '@repo/ui/button'
// import {prisma} from '@repo/db/prisma'
import {useBalance} from '@repo/store/useBalance'
import { signOut, useSession } from 'next-auth/react'

const Page = () => {
  const value = useBalance();
  const session  = useSession()
  return (
    <div className='bg-white '>
      {/* <Button onClick={()=>{}}>hiiii</Button> */}
     
      
    </div>

  )
}

export default Page