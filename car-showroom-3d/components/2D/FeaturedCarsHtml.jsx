import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'

const FeaturedCarsHtml = () => {


  const [commentDescription , setCommentDescription] = useState();
  const [comments , setComments] = useState([]);

  const router = useRouter();


  const centeredTextStyle = {
    display:"flex",
    position: 'absolute',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    width: '50%',
    
    fontSize: '24px',
    color: '#FFFFFF',
  };

  const commentBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '85%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    width: '25%',
    
    fontSize: '24px',
    color: '#FFFFFF',
  };


  const nextCarButton = {
    position: 'absolute',
    top: '50%',
    left: '5%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    width: '25%',
    
    fontSize: '24px',
    color: '#FFFFFF',
  };



  const navbarStyle = {
    position: 'absolute',
    top: '0',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0)',
    padding: '10px 0',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center', // Align items vertically to center
    justifyContent: 'space-between', // Distribute items with space around them
   
  
    
  };

  const listItemStyle = {
    display: 'inline-block',
    margin: '0 10px',
    cursor: 'pointer',
  };


  const handleSignOut = async  () => {
    await signOut( {callbackUrl: 'http://localhost:3000/' });

    // redirect("/");

  }


  useEffect(() => {

    const fetchComments = async () => {

      try {
        
        const res = await fetch("http://localhost:3000/api/comments" , {
          method: "GET"
        });

        if(res.ok) console.log("Succesffuly fetched the comments from the database");
        const result = await res.json();

        console.log(result);
        setComments(result);
      } catch (error) {
          console.log(error);
      }

    }

    fetchComments();

  },[comments])


  const handleCommentButton = async (e) => {
    e.preventDefault();


    try {
      const res = await fetch("http://localhost:3000/api/comments",{
        method: "POST",
        headers: {
          'Content-Type' : "application/json",
        },
        body: JSON.stringify({
            commentDescription
        })
      })

      if(res.ok) 
        console.log("Successfully posted the comment in the database")



    } catch (error) {
      console.log("Error commenting in the experience" , error);
    }



    
  }

  const formattedComments = comments.map((comment) => `${comment.user}: ${comment.commentDescription}`).join('\n');


  return (
    <>

<div style={navbarStyle} className="flex justify-between items-center px-5 py-3">
        <div className="ml-5 font-bold text-xl font-mono">
        <Link href={"/home"}>EVolutionary</Link>
        
      </div>
        <ul className="flex mr-5 space-x-4 font-mono ">
        <Link className="text-lg hover:text-gray-500 transition duration-300 mr-5" href="/shop/dashboard">Shop</Link>
          <Link className="text-lg hover:text-gray-500 transition duration-300 mr-5" href="/shop/cars">Cars</Link>
          <Link className="text-lg hover:text-gray-500 transition duration-300 mr-5" href="/shop/rent">Rent</Link>
          <Link className="text-lg hover:text-gray-500 transition duration-300 mr-5" href="/shop/cart">Cart</Link>
          <Link className="text-lg hover:text-gray-500 transition duration-300 mr-5" href="/shop/rent">About us</Link>
          <Link className="text-lg hover:text-gray-500 transition duration-300 mr-5" href="/shop/rent">Contact</Link>
        </ul>
        <div className="mr-5">
          <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Sign Out
          </button>
        </div>
      </div>

      


     



     

      

    </>
  )
}

export default FeaturedCarsHtml