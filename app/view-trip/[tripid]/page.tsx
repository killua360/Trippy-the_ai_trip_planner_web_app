'use client'
import { useTripDetail, useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {Trip} from '@/app/my-trips/page'
import  Itinerary  from '@/app/create-new-trip/_components/itinerary'
import GlobalMap from '@/app/create-new-trip/_components/GlobalMap';

function ViewTrip(){

    const {tripid}=useParams();
    const {userDetail,setUserDetail}=useUserDetail();
    const convex=useConvex();
    const [tripData,setTripData]=useState<Trip>();
    //@ts-ignore
    const{tripDetailInfo,setTripDetailInfo}=useTripDetail();

    useEffect(()=>{
        userDetail&&GetTrip()
    },[userDetail])

    const GetTrip=async()=>{
        const result=await convex.query(api.tripDetail.GetTripById,{
            uid:userDetail?._id,
            tripid: tripid+''
        })
        console.log(result);
        setTripData(result);
        setTripDetailInfo(result?.tripDetail);
    }
   return (
    <div>
      <Itinerary />
    </div>

);
}

export default ViewTrip