'use client'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
    const { user, isLoaded } = useUser()

    return (
        <div className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-gray-600 navbar bg-slate-100">

            <Link href='/' className="text-xl">organizing
            
            <Image
                src="/lady.png"
                width={80}
                height={80}
                alt="Picture of the author" />
            
            
            <span className='text-purple-500 uppercase'>   
                Adrienne</span></Link>
                
                <Link href='/dashboard'>REMINDERS</Link>

            {isLoaded && user && (
                <>
                    <UserButton afterSignOutUrl="/" />
                </>
            )}
             {!user && <SignInButton />}
        </div>
    )
}