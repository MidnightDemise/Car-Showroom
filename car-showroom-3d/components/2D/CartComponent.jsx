'use client'


import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CartComponent = () => {
    
    const {data: session} = useSession();


    const [cars , setCars ] = useState();
    const [isEmpty , setIsEmpty] = useState(true);
    const router = useRouter();





    useEffect(() => {



        const fetchCars = async () => {
          try {
            const result = await fetch(`/api/cart/`, { method: "POST" , body : JSON.stringify({ email: session.user.email}) })
        
        
            if (result.ok) {
              const carsData = await result.json();

              console.log(carsData.items)

              setCars(carsData);
              setIsEmpty(false);
              console.log(carsData)
              console.log(carsData.items)

              console.log("Successfully fetched cars in edit page");
            }
          } catch (error) {
            console.log(error);
          }
        };


        fetchCars();
        

      }, []);




      
      const handleDelete = async (id) => {

        try {

            const res = await fetch(`http://localhost:3000/api/cart?id=${id}`,{method: "DELETE"});

    
            if(res.ok) console.log("Successfully deleted");
            
        } catch (error) {
            console.log("Failed to delete: " , error);
        }
      
      }
    



      const handleSubmit = async () => {
        

        try {


            const caritems = cars.items;
            
            const res = await fetch("http://localhost:3000/api/orders/", {
                method: "POST",
                
                headers: {
                    "Content-Type" : "application/json"
                },

                body: JSON.stringify(
                    caritems
                )
            })

            if(res.ok) console.log("Successfully posted the cart in orders");



        } catch (error) {
            console.log("Error finishing the cart: ", error);
        }


      }

    
  return (
    <>
   
        <div class="bg-white">
        <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
            <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" class="lg:col-span-7">
                <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

                <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {!isEmpty && cars && cars.items && cars.items.map((car, index) => (
                        <li key={index} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                            <img
                            src={car.cars.image}
                            alt={`Image of ${car.cars.title}`}
                            className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                            />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                                <div className="flex justify-between">
                                <h3 className="text-sm">
                                    <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                    {car.cars.title}
                                    </a>
                                </h3>
                                </div>
                                <div className="mt-1 flex text-sm">
                                <p className="text-gray-500">{car.cars.description}</p>
                                </div>
                                <p className="mt-1 text-sm font-medium text-gray-900">{car.price}</p>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                <label htmlFor={`quantity-${index}`} className="sr-only">
                                Quantity, {car.title}
                                </label>
                                <select
                                id={`quantity-${index}`}
                                name={`quantity-${index}`}
                                className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((quantity) => (
                                    <option key={quantity} value={quantity}>
                                    {quantity}
                                    </option>
                                ))}
                                </select>

                                <div className="absolute top-0 right-0">
                                <button onClick={() => handleDelete(car._id)} type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Remove</span>
                                    <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                </button>
                                </div>
                            </div>
                            </div>

                            <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                            <svg
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                                />
                            </svg>
                            <span>In stock</span>
                            </p>
                        </div>
                        </li>
                    ))}
                    </ul>

            </section>

            <section aria-labelledby="summary-heading" class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
                <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

                <dl class="mt-6 space-y-4">
                <div class="flex items-center justify-between">
                    <dt class="text-sm text-gray-600">Subtotal</dt>
                    <dd class="text-sm font-medium text-gray-900">$99.00</dd>
                </div>
                <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt class="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Learn more about how shipping is calculated</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    </dt>
                    <dd class="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt class="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Learn more about how tax is calculated</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    </dt>
                    <dd class="text-sm font-medium text-gray-900">$8.32</dd>
                </div>
                <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt class="text-base font-medium text-gray-900">Order total</dt>
                    <dd class="text-base font-medium text-gray-900">$112.32</dd>
                </div>
                </dl>

                <div class="mt-6">
                <button onClick={handleSubmit} type="submit" class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Checkout</button>
                </div>
            </section>
            </form>
        </div>
        </div>

    </>
  )
}

export default CartComponent