"use client"
import { Button } from '@repo/ui/button';
import { useSession } from 'next-auth/react'
import { signIn,signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import React from 'react'


const AppBarClient = () => {
    const session = useSession();
    const router = useRouter();
    const user = session.data?.user?.name
   const onSignIn = ()=>{ signIn() }
   const onSignOut = async ()=>{ await signOut();
    console.log("In the signout");
    router.push("/api/auth/signin") }
  return (
    <div className='h-16 bg-gray-100 px-6 flex justify-between items-center'>
       <div className=''>
        <h1 className='text-violet-800 font-semibold text-xl'>PhonePe</h1>
       </div>
       <div className='flex items-center justify-center gap-4'>
       <h1 className='font-semibold'>{user?`Hi ${user.toUpperCase()}`:"Hi User"}</h1>
       <div><Button 
       onClick={user?onSignOut:onSignIn} bgColor={user?'bg-red-500':'bg-violet-700'} >{user?"SignOut":"SignIn"}</Button></div>
       </div>
    </div>
  )
}

export default AppBarClient