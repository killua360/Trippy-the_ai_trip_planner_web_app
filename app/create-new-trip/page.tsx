'use client'
import React, { useEffect, useState } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/itinerary'
import { useTripDetail } from '../provider';
import GlobalMap from './_components/GlobalMap';
import { Button } from '@/components/ui/button';
import { Globe2, Plane } from 'lucide-react';



function CreateNewTrip(){
    //@ts-ignore
    const {tripDetialInfo,setTripDetailInfo}=useTripDetail();
    const[activeIndex,setActiveIndex]=useState(1);
    useEffect(()=>{
        setTripDetailInfo(null)
    },[])
    return(
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
            <div>
                <ChatBox/>
            </div>
            <div className='col-span-2 relative'>
                {activeIndex==0? <Itinerary/>:<GlobalMap/>}
             
                <Button size={'lg'}  className='absolute bottom-10 right-6 bg-black has-only:bg-gray-700'
                onClick={()=>setActiveIndex(activeIndex==0?1:0)}>{activeIndex==0?<Plane/>:<Globe2/>}</Button>
                
            </div>
        </div>
    )
}

export default CreateNewTrip