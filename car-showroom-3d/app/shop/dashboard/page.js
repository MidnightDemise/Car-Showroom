'use client'

import NavbarUser from '@/components/2D/NavbarUser'
import React, { useEffect, useState } from 'react'

const DashboardUser = () => {

    const [orders , setOrders] = useState([]);
    const [rentCars , setRentCars] = useState();

    useEffect(() => {

        const fetchRent = async () => {
            try {
                
                const res = await fetch("http://localhost:3000/api/rent", {method: "GET"});

                if(res.ok) { console.log("Successfully fetched the rented cars in user dashboard");  const finalRes = await res.json(); console.log(finalRes); setRentCars(finalRes)}
            } catch (error) {
                console.log(error);
            }


        }




        const fetchOrders = async () => {

            try {
                const res = await fetch("http://localhost:3000/api/orders/", {
                    method: "GET"
                })
                if(res.ok) {
                    console.log("Succesffuly fetched orders in dashboard user");
                    
                    const ordersData = await res.json();
                    console.log(ordersData);
                    setOrders(ordersData)
                    
                }


            } catch (error) {
                console.log(error);       
            }
        }

     fetchOrders();
     fetchRent();

    }, [])

  return (
    <>
    <NavbarUser/>
    <div className="container mx-auto mt-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Total Cars Purchased</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Cumulative number of cars purchased.</p>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orders?.car?.length}</dd>
          </div>
        </dl>
      </div>
    </div>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Total Cars Rented</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Cumulative number of cars rented.</p>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{rentCars?.car?.length}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Cars Details</h3>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Model</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Purchased/Rented</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                            {orders?.car?.map(order => (
                                <tr key={order._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Purchased</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{orders.orderDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.price}</td>

                                </tr>
                            ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Rents Details</h3>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Model</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Rented</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>


              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {rentCars?.car?.map(rent => (
                                <tr key={rent._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.carName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rented</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.startDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.endDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rent.price}</td>

                                </tr>
                            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default DashboardUser