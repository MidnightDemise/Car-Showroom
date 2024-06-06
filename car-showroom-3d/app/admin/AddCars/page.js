'use client'


import Navbar from '@/components/2D/Navbar';
import { useSession } from 'next-auth/react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AddCars = () => {

  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [properties , setProperties] = useState('');
  const [price , setPrice] = useState(0);
  const [loading, setLoading] = useState(false);


  const { data: session, status } = useSession(); // Destructure session from data
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // If authenticated, do nothing
      return;
    } else if (status === "loading") {
      // If session loading, wait
      return;
    } else {
      // If not authenticated, redirect to login page
      console.log("User not authenticated. Redirecting...");
      router.push("/");
    }
  }, [status, router]);

//   const handleImageUpload = async (e) => {
//     setLoading(true);
//     const files = e.target.files;
//     const formData = new FormData();
//     formData.append('file', files[0]);
//     formData.append('upload_preset', 'your_cloudinary_upload_preset');
//     const res = await axios.post(
//       'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
//       formData
//     );
//     setImage(res.data.secure_url);
//     setLoading(false);
//   };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !description || !image ) {
        alert("Title , Description and image are required")
        return;
    }

    const formattedProperties = properties.replace(/\n/g, '<br>');

    try {
        const res = await fetch("http://localhost:3000/api/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                image,
                price,
                properties: formattedProperties
            })
        })


        if(res.ok) console.log("Successfully added Car");
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
            setImage(url);
        }
    }

    const handleOnRemove = () => {
        setImage(null);
    }

  return (
        
<>

<Navbar/>


<div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Car</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md p-2 w-full"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md p-2 w-full h-32"
            placeholder="Enter description"
          ></textarea>
        </div>
       
        <CldUploadButton className='relative h-48 border-dotted border-2  grid place-items-center bg-slate-100 mb-5 w-full px-4 py-2 bg-blue-500 rounded-xl text-white' uploadPreset='ml_default'  onSuccess={handleImage}>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        </div>
      

      
        {image && <Image
            src={image}
            fill
            className='absolute object-cover inset-0'
        />}

        </CldUploadButton>
        

        {image && <button type='submit' className='bg-red-500 my-2 text-white px-5 py-2 rounded-md ' onClick={handleOnRemove}>
            Remove Image
        </button>}

        <br />



        

        <CldUploadButton className='relative h-48 border-dotted border-2  grid place-items-center bg-slate-100 mb-5 w-full px-4 py-2 bg-blue-500 rounded-xl text-white' uploadPreset='ml_default'  onSuccess={handleImage}>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        </div>
      

      
        {image && <Image
            src={image}
            fill
            className='absolute object-cover inset-0'
        />}

        </CldUploadButton>
        
        <br/>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-md p-2 w-full"
            placeholder="Enter Price"
          />
        </div>

        <br/>


        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Properties</label>
          <textarea
            id="properties"
            value={properties}
            onChange={(e) => setProperties(e.target.value)}
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

  );
};

export default AddCars;