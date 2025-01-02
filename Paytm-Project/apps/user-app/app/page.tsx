"use client"
import React from 'react'
import { Button } from '@repo/ui/button'
// import {prisma} from '@repo/db/prisma'
import {useBalance} from '@repo/store/useBalance'

const Page = () => {
  const value = useBalance();
  return (
    <div>
      <h1>In the global page</h1>
      <h1 className='bg-red-800 text-green-500'>Hii everyone</h1>
      <Button appName='fqws' className='bg-pink-600'>hiiii</Button>
      <h1>The balance is  {value}</h1>
    </div>

  )
}

export default Page