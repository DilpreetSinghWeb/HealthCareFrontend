/* eslint-disable react/prop-types */

import { useContext } from "react";
import convertTime from "../../utils/convertTime";
import {BASE_URL, token} from './../../config';
import {toast} from 'react-toastify'
import { authContext } from "../../context/AuthContext";


const SidePanel = ({doctorId,ticketPrice,timeSlots} ) => {
  const data = useContext(authContext);
  const bookingHandler = async ()=>{
    if(!data.user){
      return toast.error("To book an appointment, please register first.")
    }
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
        method: "POST",
        headers: {
          Authorization:`Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          price: ticketPrice
        })
      })

      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message + 'Please try again');
      }
      if(data.session.url){
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error(error.message);

    }
  }
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
        &#8377; {ticketPrice} 
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
            Available Time Slots:
        </p>

        <ul className="mt-3">
            {timeSlots?.map((item,index)=>(
                <li key={index} className="flex items-center justify-between mb-2">
                <p className="capitalize text-[15px] leading-6 text-textColor font-semibold">
                    {item.day}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                    {convertTime(item.startingTime)}  - {convertTime(item.endingTime)} 
                </p>
            </li>
            ))}
            
        </ul>
      </div>

      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  )
}

export default SidePanel
