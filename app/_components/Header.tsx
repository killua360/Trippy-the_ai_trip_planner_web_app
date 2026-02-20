"use client"
import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { SignInButton ,UserButton,useUser} from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const menuOption=[
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Pricing',
        path: '/pricing'
    },
    {
        name: 'Contact Us',
        path: '/conatct-us'
    }
]

function Header(){

    const{user}=useUser();
    const path=usePathname();
    console.log(path)

    return (
        <div className='flex justify-between items-center p-4'>
            {/* logo */}
            <div className='flex gap-2 items-center '>

                <Image src={'/logo.svg'} alt='logo' width={50} height={50} />
                <h2 className='font-bold text-3xl'>Trippy</h2>

            </div>
            {/* menu option */}
            <div className='flex gap-8 items-center'>
                {menuOption.map((menu, index)=>(
                    <Link key={menu.path} href={menu.path}>
                    <h2 className='text-lg hover:scale-105 transition-all'>{menu.name}</h2>
                    </Link>
                ))
                }
            </div>
            {/*get started button */}
            <div className='flex gap-5 items-center'>
            {!user? <SignInButton mode='modal'>
            <Button>
                Get Started
            </Button>
            </SignInButton>:
                path=='/create-new-trip'?<Link href={'/my-trips'}>
                    <Button >My Trips</Button>
                </Link>
                :<Link href={'/create-new-trip'}>
                    <Button >Create New Trip</Button>
                </Link>
                }
                <UserButton/>
                 </div>
        </div>
    )
}

export default Header