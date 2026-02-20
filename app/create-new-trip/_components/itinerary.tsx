'use client'
import React, { useEffect, useState } from 'react'
import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem'
import {useTripDetail} from '@/app/provider'
import { TripInfo } from './ChatBox';
import Image from "next/image";
import { ArrowLeft } from 'lucide-react';

//  const Trip_DATA={
//         "destination": "Bangalore",
//         "duration": "3 Days",
//         "origin": "Goa",
//         "budget": "Moderate",
//         "group_size": "1",
//         "hotels": [
//             {
//                 "hotel_name": "The Chancery Pavilion",
//                 "hotel_address": "135, Residency Road, Bangalore, Karnataka 560025, India",
//                 "price_per_night": "₹3500",
//                 "hotel_image_url": "https://www.thechancerypavilion.com/images/hotel-exterior.jpg",
//                 "geo_coordinates": {
//                     "latitude": 12.9763,
//                     "longitude": 77.602
//                 },
//                 "rating": 4.2,
//                 "description": "A centrally located upscale hotel offering comfortable rooms, fine dining, and a pool, perfect for moderate budget travelers."
//             },
//             {
//                 "hotel_name": "Lemon Tree Hotel, Ulsoor Lake, Bangalore",
//                 "hotel_address": "No. 10, Ulsoor Road, Bangalore, Karnataka 560042, India",
//                 "price_per_night": "₹3200",
//                 "hotel_image_url": "https://www.lemontreehotels.com/images/hotels/ulsoor-lake/exterior.jpg",
//                 "geo_coordinates": {
//                     "latitude": 12.9768,
//                     "longitude": 77.6201
//                 },
//                 "rating": 4,
//                 "description": "A vibrant hotel near Ulsoor Lake with modern amenities, multiple dining options, and a great location for food lovers."
//             },
//             {
//                 "hotel_name": "Hotel Royal Orchid Bangalore",
//                 "hotel_address": "1, Golf Avenue, Off MG Road, Bangalore, Karnataka 560001, India",
//                 "price_per_night": "₹4000",
//                 "hotel_image_url": "https://www.royalorchidhotels.com/royal-orchid-bangalore/images/hotel-exterior.jpg",
//                 "geo_coordinates": {
//                     "latitude": 12.9716,
//                     "longitude": 77.5946
//                 },
//                 "rating": 4.3,
//                 "description": "A luxury hotel offering elegant rooms, fine dining, and close proximity to Bangalore's famous MG Road food scene."
//             }
//         ],
//         "itinerary": [
//             {
//                 "day": 1,
//                 "day_plan": "Explore traditional South Indian cuisine and street food in the city center.",
//                 "best_time_to_visit_day": "8:00 AM to 6:00 PM",
//                 "activities": [
//                     {
//                         "place_name": "MTR (Mavalli Tiffin Rooms)",
//                         "place_details": "Iconic restaurant known for authentic South Indian breakfast and lunch dishes like dosa, idli, and rava idli.",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9d/MTR_Restaurant_Bangalore.jpg",
//                         "geo_coordinates": {
//                             "latitude": 12.9718,
//                             "longitude": 77.5946
//                         },
//                         "place_address": "14, Lalbagh Rd, Mavalli, Bangalore, Karnataka 560027",
//                         "ticket_pricing": "₹100-₹300 per meal",
//                         "time_travel_each_location": "30 minutes from hotel",
//                         "best_time_to_visit": "8:00 AM - 10:00 AM"
//                     },
//                     {
//                         "place_name": "V V Puram Food Street",
//                         "place_details": "A bustling street famous for diverse street food including chaats, dosas, and sweets.",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/59/V.V._Puram_Food_Street_in_Bangalore.jpg",
//                         "geo_coordinates": {
//                             "latitude": 12.9497,
//                             "longitude": 77.5714
//                         },
//                         "place_address": "V V Puram, Basavanagudi, Bangalore, Karnataka 560004",
//                         "ticket_pricing": "₹50-₹200 per dish",
//                         "time_travel_each_location": "20 minutes from MTR",
//                         "best_time_to_visit": "11:00 AM - 2:00 PM"
//                     },
//                     {
//                         "place_name": "CTR (Central Tiffin Room)",
//                         "place_details": "Famous for crispy benne dosas and traditional Karnataka breakfast.",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Central_Tiffin_Room_Bangalore.jpg",
//                         "geo_coordinates": {
//                             "latitude": 12.9351,
//                             "longitude": 77.5684
//                         },
//                         "place_address": "Shivaji Nagar, Bangalore, Karnataka 560051",
//                         "ticket_pricing": "₹80-₹250 per meal",
//                         "time_travel_each_location": "15 minutes from V V Puram",
//                         "best_time_to_visit": "3:00 PM - 5:00 PM"
//                     }
//                 ]
//             },
//             {
//                 "day": 2,
//                 "day_plan": "Discover Bangalore’s modern cafes and diverse cuisine in Indiranagar.",
//                 "best_time_to_visit_day": "10:00 AM to 8:00 PM",
//                 "activities": [
//                     {
//                         "place_name": "Toit Brewpub",
//                         "place_details": "Popular microbrewery with great craft beers and delicious pub food.",
//                         "place_image_url": "https://toit.in/assets/images/Toit-Brewpub-1.jpg",
//                         "geo_coordinates": {
//                             "latitude": 12.9717,
//                             "longitude": 77.64
//                         },
//                         "place_address": "298, 100 Feet Road, Indiranagar, Bangalore, Karnataka 560038",
//                         "ticket_pricing": "₹300-₹800 for drinks and food",
//                         "time_travel_each_location": "30 minutes from hotel",
//                         "best_time_to_visit": "12:00 PM - 3:00 PM"
//                     },
//                     {
//                         "place_name": "Smoke House Deli",
//                         "place_details": "Trendy cafe known for European style dishes, desserts, and excellent coffee.",
//                         "place_image_url": "https://smokehouse-deli.com/assets/images/smoke-house-deli-restaurant.jpg",
//                         "geo_coordinates": {
//                             "latitude": 12.971,
//                             "longitude": 77.639
//                         },
//                         "place_address": "12, 100 Feet Road, Indiranagar, Bangalore, Karnataka 560038",
//                         "ticket_pricing": "₹400-₹900 per meal",
//                         "time_travel_each_location": "5 minutes from Toit",
//                         "best_time_to_visit": "4:00 PM - 6:00 PM"
//                     },
//                     {
//                         "place_name": "Art Blend Cafe",
//                         "place_details": "Cozy cafe blending art and food, offering vegetarian-friendly dishes and desserts.",
//                         "place_image_url": "https://artblendcafe.com/wp-content/uploads/2020/05/cafe-interior.jpg",
//                         "geo_coordinates": {
//                             "latitude": 12.9722,
//                             "longitude": 77.6385
//                         },
//                         "place_address": "100 Feet Road, Indiranagar, Bangalore, Karnataka 560038",
//                         "ticket_pricing": "₹250-₹600 per meal",
//                         "time_travel_each_location": "5 minutes from Smoke House Deli",
//                         "best_time_to_visit": "6:30 PM - 8:00 PM"
//                     }
//                 ]
//             },
//             {
//                 "day": 3,
//                 "day_plan": "Enjoy fusion cuisine and local markets in Koramangala.",
//                 "best_time_to_visit_day": "9:00 AM to 7:00 PM",
//                 "activities": [
//                     {
//                         "place_name": "The Fatty Bao",
//                         "place_details": "Asian gastro bar serving innovative dishes and cocktails in a vibrant setting.",
//                         "place_image_url": "https://thefattybao.com/images/restaurant.jpg",
//                         "geo_coordinates": {
//                             "latitude": 12.9354,
//                             "longitude": 77.6189
//                         },
//                         "place_address": "2nd Floor, 12th Main Rd, Koramangala 5th Block, Bangalore, Karnataka 560095",
//                         "ticket_pricing": "₹600-₹1200 per meal",
//                         "time_travel_each_location": "20 minutes from hotel",
//                         "best_time_to_visit": "12:00 PM - 2:00 PM"
//                     },
//                     {
//                         "place_name": "Koramangala Indoor Market",
//                         "place_details": "A lively local market offering fresh produce, street snacks, and local delicacies.",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/37/Koramangala_Market.jpg",
//                         "geo_coordinates": {
//                             "latitude": 12.9332,
//                             "longitude": 77.6195
//                         },
//                         "place_address": "Koramangala 4th Block, Bangalore, Karnataka 560034",
//                         "ticket_pricing": "Free entry; food prices vary",
//                         "time_travel_each_location": "10 minutes from The Fatty Bao",
//                         "best_time_to_visit": "3:00 PM - 5:00 PM"
//                     },
//                     {
//                         "place_name": "Sly Granny",
//                         "place_details": "Eclectic restaurant with a quirky ambiance serving contemporary global cuisine.",
//                         "place_image_url": "https://slygranny.com/images/restaurant_exterior.jpg",
//                         "geo_coordinates": {
//                             "latitude": 12.9358,
//                             "longitude": 77.6177
//                         },
//                         "place_address": "12, 1st Floor, 8th Main Rd, Koramangala 5th Block, Bangalore, Karnataka 560095",
//                         "ticket_pricing": "₹700-₹1300 per meal",
//                         "time_travel_each_location": "10 minutes from Koramangala Market",
//                         "best_time_to_visit": "5:30 PM - 7:00 PM"
//                     }
//                 ]
//             }
//         ]
// } 


function itinerary (){
    //@ts-ignore
    const{tripDetailInfo,setTripDetailInfo}=useTripDetail();
    const [tripData,setTripData]=useState<TripInfo | null>(null)

    useEffect(()=>{
        tripDetailInfo&&setTripData(tripDetailInfo)
    },[tripDetailInfo])

    const data = tripData?[
    {
      title: "Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData?.hotels.map((hotel,index)=>(
            <HotelCardItem key={hotel.hotel_name + index} hotel={hotel}/>
          ))}
        </div>
      ),
    },
    ...tripData?.itinerary.map((dayData)=>({
        title: `Day ${dayData?.day}`,
        content:(
            <div>
                <p className="mb-5 text-primary font-bold" >Best Time :{dayData?.best_time_to_visit_day}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {dayData?.activities.map((activity,index)=>(
                    <PlaceCardItem key={activity.place_name + index} activity={activity}/>
                ))}
                </div>
            </div>
        )
    }))
  ]:[];
  return (
    <div className="relative w-full h-full overflow-auto">
        
      {tripData ? <Timeline data={data} tripData={tripData}/> :<div> <Image src={'/travel.jpg'} alt='travel' width={1000} height={1000} className=' w-auto max-h-[85vh] object-cover rounded-3xl ' priority/>
      <h2 className='flex gap-2 text-4xl text-white items-center absolute bottom-6'><ArrowLeft/>Getting to know you to build perfect trip here...</h2>
      </div>}
    </div>
  );
}
export default itinerary 