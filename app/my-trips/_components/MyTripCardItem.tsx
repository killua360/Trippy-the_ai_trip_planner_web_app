import React, { useEffect, useState } from 'react'
import {Trip} from '../page'
import { ArrowBigRight } from 'lucide-react'
import Image from "next/image";
import axios from 'axios';
import Link from 'next/link';

type Props={
    trip:Trip
}

function MyTripCardItem({trip}:Props){
     const [photoUrl,setPhotoUrl]=useState<string>();

     useEffect(()=>{
        trip&&GetGooglePlaceDetail();
    },[trip])

    const GetGooglePlaceDetail=async()=>{
        const result=await axios.post('/api/google-place-detail',{
            placeName:trip?.tripDetail?.destination
        });
        if(result?.data?.e){
            return;
        }
        setPhotoUrl(result?.data)
    }
    return (
        <Link href={'/view-trip/'+trip?.tripId} className='p-5 shadow rounded-2xl '>
            <div className='relative w-full h-48'>
                        <Image src ={photoUrl?photoUrl:'/helper.png'} alt={trip.tripId} fill
                        className='rounded-xl shadow'/>
                </div>
                        <h2 className='flex gap-2  font-semibold text-xl justify-center mt-2'>{trip?.tripDetail?.origin}<ArrowBigRight/>{trip?.tripDetail?.destination}</h2>
                        <h2 className='mt-2 text-gray-500 text-center justify-center'>{trip?.tripDetail?.duration}Trip with {trip?.tripDetail?.budget} Budget</h2>
         </Link>
    )
}

export default MyTripCardItem