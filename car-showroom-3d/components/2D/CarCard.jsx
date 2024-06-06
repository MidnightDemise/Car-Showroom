'use client'



import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CarCard = ({ id , title, description, image }) => {


  const [cart, setCart] = useState([{}]); // Initialize cart state

  useEffect(() => {
      localStorage.clear();
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(savedCart);
  }, []);

  const addToCart = async (carId) => {
      try {
          const res = await fetch(`http://localhost:3000/api/cars/${carId}`);
          const finalRes = await res.json();
          if (res.ok) {
              const { title, description, image } = finalRes;
              const carItem = { title, description, image };
              const newCart = [...cart, carItem];
              setCart(newCart);
              localStorage.setItem('cart', JSON.stringify(newCart));
              
              await fetch("http://localhost:3000/api/shop", {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      cart: newCart
                  })
              });
          }
      } catch (error) {
          console.log("Error: ", error);
      }
  };
  



  return (
        <div className="hero bg-black text-black">
            <img className="hero-profile-img" src={image} alt="" />
            <div className="hero-logo">
                
            </div>
            <div className=" p-4 text-black hero-description">
                <p className='text-black'>{title}</p>
            </div>
            <div className="hero-btn">
                <button onClick={() => {addToCart(id)}}>Add To Cart</button>
            </div>
            <div className="hero-btn2">
                <button>Learn More</button>
            </div>
            </div>
   
  );
};

const CarCardList = ({ cars }) => {
  return (
    <>
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
    {cars.map((car, index) => (
        <CarCard
          key={index}
          id={car._id}
          title={car.title}
          description={car.description}
          image={car.image}
        />
      ))}
    </div>
      
    </>
  );
};

const CarCardContainer = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const result = await fetch("/api/cars", { method: "GET" });
        if (result.ok) {
          const carsData = await result.json();
          setCars(carsData);
          console.log("Successfully fetched cars in edit page");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (status === "authenticated") {
      fetchCars();
    } else if (status !== "loading") {
      console.log("User not authenticated. Redirecting...");
      router.push("/");
    }
  }, [status, router]);

  return <CarCardList cars={cars} />;
};

export default CarCardContainer;