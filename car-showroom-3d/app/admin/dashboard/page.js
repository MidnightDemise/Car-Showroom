'use client'

import Navbar from '@/components/2D/Navbar';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {

    const router = useRouter();
    const [cars, setCars] = useState();
    const [rentCars , setRentCars] = useState();
    const [totalRented , setTotalRented] = useState(0);
    const [orders , setOrders] = useState();


    const handleAddProduct = () => {
        router.push("/AddCars");
    }


    useEffect(() => {

        const fetchCars = async() => {


            try {
                const res = await fetch("http://localhost:3000/api/cars", {method: "GET"});

                if(res.ok)
                {
                    const result = await res.json();
                    setCars(result);
                    console.log(result);

                }

                
            } catch (error) {
                console.log("Error fetching cars" , error);
            }


        }


        const fetchOrders = async () => {
            try {
                
                const res = await fetch("http://localhost:3000/api/ordersAll", {method: "GET"});

                if(res.ok) {
                    const result = await res.json();

                    console.log(result);

                    setOrders(result);
                }


            } catch (error) {
                console.log("Error fetching the orders", error);
            }
        }


        const fetchRentCars = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/rentAll", {method: "GET"});

                if(res.ok)
                {
                    const result = await res.json();
                    let totalRentedCars = 0;

                    
                    for (let i = 0; i < result.length; i++) {
                        totalRentedCars += result[i].car.length;
                    }

                    setTotalRented(totalRentedCars);
                    setRentCars(result);
                }
            } catch (error) {
                
            }

        }

        fetchRentCars();
        fetchCars();
        fetchOrders();


    },[])



    for(let i = 0 ; i  < rentCars?.length ; i++)
    {   
        rentCars[i].car.length
    }



  return (
    <>
    <Navbar/>
    <div className="flex flex-col h-screen bg-gray-100">
        <div className="bg-white text-white shadow w-full p-2 flex items-center justify-between">
            <div className="space-x-5">
                <button>
                    <i className="fas fa-bell text-gray-500 text-lg"></i>
                </button>
                <button>
                    <i className="fas fa-user text-gray-500 text-lg"></i>
                </button>
            </div>
        </div>
        <div className="flex-1 flex flex-wrap">
            <div className="flex-1 p-4 w-full md:w-1/2">
                <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
                    <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                        <h2 className="text-gray-500 text-lg font-semibold pb-1">Total Cars</h2>
                        <div className="my-1"></div> 
                        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
                        <div className="chart-container" style={{ position: "relative", height: "150px", width: "100%" }}>
                            <div className="mx-auto relative animate-spin rounded-full h-20 w-20 border-t-4 border-cyan-500 border-opacity-75"></div>
                            <h1 className='text-center text-3xl mt-4'>{cars?.length}</h1>
                        </div>
                    </div>
                    <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                        <h2 className="text-gray-500 text-lg font-semibold pb-1">Total Rented</h2>
                        <div className="my-1"></div> 
                        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
                        <div className="mx-auto relative animate-spin rounded-full h-20 w-20 border-t-4 border-cyan-500 border-opacity-75"></div>
                        <h1 className='text-center text-3xl mt-4'>{totalRented}</h1>
                    </div>
                </div>
                <div className="mt-8 bg-white p-4 shadow rounded-lg overflow-x-auto">
                    <h2 className="text-gray-500 text-lg font-semibold pb-4">People Who Bought and Rented</h2>
                    <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="text-sm leading-normal">
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Date</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Email</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Purchased</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order, index) => (
                                order.car.map((car, carIndex) => (
                                    <tr key={`${index}-${carIndex}`} className="hover:bg-grey-lighter">
                                        <td className="py-2 px-4 border-b border-grey-light">
                                            <img src={car.image} alt="Car" className="rounded-full h-10 w-10" />
                                        </td>
                                        <td className="py-2 px-4 border-b border-grey-light">{order.email}</td>
                                        <td className="py-2 px-4 border-b border-grey-light">{car.name}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                    <div className="text-right mt-4">
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                            Delete All
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-4 w-full md:w-1/2">
                <div className="mt-8 bg-white p-4 shadow rounded-lg overflow-x-auto">
                    <h2 className="text-gray-500 text-lg font-semibold pb-4">Car Rented</h2>
                    <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="text-sm leading-normal">
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Email</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Car Name</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-center">Start Date</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-center">End Date</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-center">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rentCars?.map((rent, rentIndex) => (
                                rent.car.map((car, carIndex) => (
                                    <tr key={`${rentIndex}-${carIndex}`} className="hover:bg-grey-lighter">
                                        <td className="py-2 px-4 border-b border-grey-light">{rent.email}</td>
                                        <td className="py-2 px-4 border-b border-grey-light">{car.carName}</td>
                                        <td className="py-2 px-4 border-b border-grey-light">{car.startDate}</td>
                                        <td className="py-2 px-4 border-b border-grey-light">{car.endDate}</td>
                                        <td className="py-2 px-4 border-b border-grey-light text-right">${car.price}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                    <div className="text-right mt-4">
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                            Delete All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default AdminDashboard