'use client'

import NavbarUser from '@/components/2D/NavbarUser'
import React, { useEffect, useState } from 'react'

const ShopPage = () => {


    const [cars , setCars] = useState([])
        

    useEffect(() => {

        const fetchCars = async () => {
            try {
                const result = await fetch("http:localhost:3000/api/cars" , { method : "GET"});
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


        fetchCars();

        })




  return (
    <>
        <NavbarUser/>
            
    <section class="py-24 flex items-center min-h-screen justify-center bg-white">
        <div class="mx-auto max-w-[43rem]">
            <div class="text-center">
            <p class="text-lg font-medium leading-8 text-indigo-600/95">Introducing Electric Cars</p>
            <h1 class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">Power up your drive&nbsp;by EVolutionary</h1>
            <p class="mt-3 text-lg leading-relaxed text-slate-400">Specify helps you unify your brand identity by collecting, storing and distributing design tokens and assets — automatically.</p>
            </div>

            <div class="mt-6 flex items-center justify-center gap-4">
            <a href="#" class="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700">Get started for free</a>
            <a href="#" class="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50"> Request a demo </a>
            </div>
        </div>
    </section>
        

    <div class="max-w mx-auto bg-blue-700 p-4">
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-x-6">

{/* Iterating over cars and creating card components */}
            {cars.map((car, index) => (
                <div key={index} className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg" src={car.image} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">{car.title}</h5>
                        </a>
                        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">{car.description}</p>
                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                        <button className='px-8 py-2 text-white bg-green-500 rounded-md ml-10'>
                                Buy
                        </button>
                    </div>
                </div>
            ))}
            </div>
    </div>





    </>
    
  )
}

export default ShopPage