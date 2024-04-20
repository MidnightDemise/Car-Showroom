'use client'

import Navbar from '@/components/2D/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditCars = () => {

    const { data: session, status } = useSession(); // Destructure session from data
    const router = useRouter();
    const [cars, setCars] = useState([]);
    useEffect(() => {
        {

            
        const fetchCars = async () => {
            try {
                const result = await fetch("/api/cars" , { method : "GET"});
                if(result.ok)
                {
                    const carsData = await result.json();
                    setCars(carsData);
                    console.log("Successfully fetched cars in edit page");
                }
            } catch (error) {
                console.log(error);
            }
            
        }
            if (status === "authenticated") {
                fetchCars();
                return;
              } else if (status === "loading") {
                // If session loading, wait
                return;
              } else {
                // If not authenticated, redirect to login page
                console.log("User not authenticated. Redirecting...");
                router.push("/");
              }
        }
     



    }, [status, router]);




    const handleEdit = (carId) => {
        // Handle edit action
        console.log("Editing car with ID:", carId);
        router.push(`EditCars/${carId}`); // Assuming your

    };

    const handleDelete = async (carId) => {
        // Handle delete action
        const confirm = window.confirm("Are you sure you want to delete this?")

        if(confirm)
        {
            try {
                
               const res = await fetch(`http://localhost:3000/api/cars?id=${carId}`,{method: "DELETE"});
               console.log(res);
               if(res.ok) console.log("Successfully deleted the car");
            } catch (error) {
                console.log("Didnt delete the car " , error);
            }
        }

        console.log("Deleting car with ID:", carId);

        
    };


  return (
    <>
    <Navbar/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars.map((car, index) => (
           <div key={index} className="bg-white rounded-lg shadow-md p-4">
           <img src={car.image} alt={car.title} className="w-full h-40 object-cover rounded-t-lg" />
           <div className="p-4">
               <h2 className="text-lg font-semibold">{car.title}</h2>
               <p className="text-gray-600">{car.description}</p>
               <div className="mt-4 flex justify-between">
                   <button
                       onClick={() => handleEdit(car._id)}
                       className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                   >
                       Edit
                   </button>
                   <button
                       onClick={() => handleDelete(car._id)}
                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                   >
                       Delete
                   </button>
               </div>
           </div>
       </div>
        ))}
    </div>
    </>
    
  )
}

export default EditCars