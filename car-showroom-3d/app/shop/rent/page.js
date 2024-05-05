'use client'


import NavbarUser from '@/components/2D/NavbarUser'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const RentPage = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('3 months');
  const {data: session} = useSession();
  const today = new Date();

  const start = new Date(today);
  const end = new Date();
  end.setMonth(start.getMonth() + 3);





  
  useEffect(() => {

    console.log(session);
    const fetchCars = async () => {
      try {
        const result = await fetch("/api/cars", { method: "GET" });
        if (result.ok) {
          const carsData = await result.json();
          setCars(carsData);
          console.log("Successfully fetched cars in rent page");
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchCars();
  }, [router]);




  
  const calculateRentPrice = (price, duration) => {
    switch (duration) {
      case '3 months':
        return price / 10;
      case '6 months':
        return price  / 5;
      default:
        return price;
    }
  }

  const handleDurationChange = (index, duration) => {
    setSelectedDuration(duration);
    // Optionally, you can update the price in the backend or perform any other actions here
  }


  const handleRentButton = async (id) => {

    try {

      const res = await fetch("http://localhost:3000/api/rent", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json' // Separate key and value with a colon
        },
        body: JSON.stringify({
          email: session?.user?.email,
          id: id,
          startDate: today.toISOString().split(":")[0].substring(0,10),
          endDate: end.toISOString().split(":")[0].substring(0,10),
        })
      });


      if(res.ok) console.log("Successfully rented the car");
    }
      
    catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <NavbarUser />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cars.map((car, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={car.image} alt={car.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{car.title}</h3>
                <p className="text-gray-600 mb-2">{car.description}</p>
                <p className="text-gray-700 font-bold mb-2">Price: ${calculateRentPrice(car.price, selectedDuration)}</p>
                <div className="flex items-center mb-4">
                  <label htmlFor={`rent-option-${index}`} className="mr-2">Renting for:</label>
                  <select id={`rent-option-${index}`} className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                    value={selectedDuration} onChange={(e) => handleDurationChange(index, e.target.value)}>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    {/* Add more options here if needed */}
                  </select>
                </div>
                <button onClick={() => handleRentButton(car._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Rent Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RentPage;
