'use client'

import Navbar from '@/components/2D/Navbar';
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminDashboard = () => {

    const router = useRouter();

    const handleAddProduct = () => {
        router.push("/AddCars");
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
                    <h1 className='text-center text-3xl mt-4'>15</h1>
                    </div>
                </div>

              
                <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                    <h2 className="text-gray-500 text-lg font-semibold pb-1">Total Rented</h2>
                    <div className="my-1"></div> 
                    <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
                    <div className="mx-auto relative animate-spin rounded-full h-20 w-20 border-t-4 border-cyan-500 border-opacity-75"></div>
                    <h1 className='text-center text-3xl mt-4'>15</h1>
                </div>
            </div>

            <div className="mt-8 bg-white p-4 shadow rounded-lg">
                <h2 className="text-gray-500 text-lg font-semibold pb-4">People Who Bought and rented</h2>
                <div className="my-1"></div> 
                <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
                <table className="w-full table-auto text-sm">
                    <thead>
                        <tr className="text-sm leading-normal">
                            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Date</th>
                            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Email</th>
                            <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Rent or Buy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
                            <td className="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
                            <td className="py-2 px-4 border-b border-grey-light">Comercio</td>
                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
                            <td className="py-2 px-4 border-b border-grey-light">María Gómez</td>
                            <td className="py-2 px-4 border-b border-grey-light">Usuario</td>
                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
                            <td className="py-2 px-4 border-b border-grey-light">Carlos López</td>
                            <td className="py-2 px-4 border-b border-grey-light">Usuario</td>
                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
                            <td className="py-2 px-4 border-b border-grey-light">Laura Torres</td>
                            <td className="py-2 px-4 border-b border-grey-light">Comercio</td>
                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
                            <td className="py-2 px-4 border-b border-grey-light">Ana Ramírez</td>
                            <td className="py-2 px-4 border-b border-grey-light">Usuario</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-right mt-4">
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                        Ver más
                    </button>
                </div>
            </div>

          
            <div className="mt-8 bg-white p-4 shadow rounded-lg">
                <div className="bg-white p-4 rounded-md mt-4">
                    <h2 className="text-gray-500 text-lg font-semibold pb-4">Transacciones</h2>
                    <div className="my-1"></div>
                    <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="text-sm leading-normal">
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Fecha</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-grey-lighter">
                                <td className="py-2 px-4 border-b border-grey-light">Carlos Sánchez</td>
                                <td className="py-2 px-4 border-b border-grey-light">27/07/2023</td>
                                <td className="py-2 px-4 border-b border-grey-light text-right">$1500</td>
                            </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-2 px-4 border-b border-grey-light">Pedro Hernández</td>
                            <td className="py-2 px-4 border-b border-grey-light">02/08/2023</td>
                            <td className="py-2 px-4 border-b border-grey-light text-right">$1950</td>
                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-2 px-4 border-b border-grey-light">Sara Ramírez</td>
                            <td className="py-2 px-4 border-b border-grey-light">03/08/2023</td>
                            <td className="py-2 px-4 border-b border-grey-light text-right">$1850</td>
                        </tr>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-2 px-4 border-b border-grey-light">Daniel Torres</td>
                            <td className="py-2 px-4 border-b border-grey-light">04/08/2023</td>
                            <td className="py-2 px-4 border-b border-grey-light text-right">$2300</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="text-right mt-4">
                        <div className="text-right mt-4">
                            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                                Ver más
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default AdminDashboard