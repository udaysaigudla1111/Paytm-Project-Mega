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
    <div>
      <h1>In the global page</h1>
      <h1 className='bg-red-800 text-green-500'>Hii everyone</h1>
      <Button appName='fqws' className='bg-pink-600'>hiiii</Button>
      <h1>The balance is  {value} and session is {JSON.stringify(session)}</h1>
      <button onClick={()=>{ signOut() }} className='px-2 py-2 ml-11 bg-blue-600'>Signout</button>
    </div>

  )
}

export default Page