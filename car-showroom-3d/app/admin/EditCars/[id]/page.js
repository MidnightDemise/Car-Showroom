'use client'


import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditCar = () => {

    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const [car, setCar] = useState();
    const [oldtitle , setOldTitle] = useState('');
    const [oldDescription , setOldDescription] = useState('');
    const [oldImage , setOldImage] = useState();
    const [oldProperties , setOldProperties] = useState('');



    const [newTitle , setNewTitle] = useState();
    const [newDescription , setNewDescription] = useState();
    const [newImage , setNewImage] = useState(); 
    const [newProperties , setNewProperties] = useState();

    useEffect(() => {
        const fetchSpecificCar = async () => {
            try {
                const res = await fetch(`/api/cars/${params.id}`,{method: "GET"});

                if(res.ok)
                {
                    const carData = await res.json();
                    
                    console.log("Successfully fetched the EditCars (specific id) page");
                    setNewTitle(carData.title);
                    setNewDescription(carData.description);
                    setNewImage(carData.image);
                    setNewProperties(carData.car_properties);
                    setCar(carData);
                
                }

            } catch (error) {
                console.log("Failed to fetch the car in the EditCars (speicifc id) page " , error);
            }
        }


        fetchSpecificCar();
    }, [])




    const handleSubmit = async (e) => {
        e.preventDefault();
    
       
    
        const formattedProperties = newProperties.replace(/\n/g, '<br>');
        try {
            const res = await fetch(`/api/cars/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    newTitle,
                    newDescription,
                    newImage,
                    newProperties: formattedProperties
                })
            })
    
    
            if(res.ok){
                console.log("Successfully updated Car");
                router.push("./")
            } 
        } catch (error) {
            console.log("Error adding car : " , error);
        }
            
    
            
        // You can perform further validations here
        // and then send the data to the server
      };
    

  
    const handleImage = (result) => {


        const info = result.info;
    
            if('secure_url' in info && 'public_id' in info)
            {
                const url = info.secure_url;
                setNewImage(url);
            }
        }





    const handleOnRemove = () => {
        setNewImage(null);
    }
  return (
    <>
    

<div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Car</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border rounded-md p-2 w-full"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border rounded-md p-2 w-full h-32"
            placeholder="Enter description"
          ></textarea>
        </div>
       
        <CldUploadButton className='relative h-48 border-dotted border-2  grid place-items-center bg-slate-100 mb-5 w-full px-4 py-2 bg-blue-500 rounded-xl text-white' uploadPreset='ml_default'  onSuccess={handleImage}>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap ="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        </div>
      

      
        {newImage && <Image
            src={newImage}
            fill
            className='absolute object-cover inset-0'
        />}

        </CldUploadButton>
        

        {newImage && <button type='submit' className='bg-red-500 my-2 text-white px-5 py-2 rounded-md ' onClick={handleOnRemove}>
            Remove Image
        </button>}

        <br />

        
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Properties</label>
          <textarea
            id="properties"
            value={newProperties}
            onChange={(e) => setNewProperties(e.target.value)}
            className="border rounded-md p-2 w-full h-32"
            placeholder="Enter properties"
          ></textarea>
        </div>


        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Car
        </button>
      </form>
    </div>
    
    </>
  )
}

export default EditCar