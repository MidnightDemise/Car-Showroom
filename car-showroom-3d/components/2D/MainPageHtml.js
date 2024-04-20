import { signOut } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'

const MainPageHtml = () => {


  const centeredTextStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    
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

  return (
    <>

<div style={navbarStyle} className="flex justify-between items-center px-5 py-3">
        <div className="ml-5 font-bold text-xl font-mono">
          <h1>EVolutionary</h1>
        </div>
        <ul className="flex mr-5 space-x-4 font-mono ">
          <li className="text-lg"><a href="#" className="hover:text-gray-500 transition transition-duration-300 mr-5">Home</a></li>
          <li className="text-lg"><a href="#" className="hover:text-gray-500 transition transition-duration-300 mr-5">About</a></li>
          <li className="text-lg"><a href="#" className="hover:text-gray-500 transition transition-duration-300 mr-5">Services</a></li>
          <li className="text-lg"><a href="#" className="hover:text-gray-500 transition transition-duration-500 mr-5">Contact</a></li>
        </ul>
        <div className="mr-5">
          <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Sign Out
          </button>
        </div>
      </div>
      
      <div style={centeredTextStyle}>
        <h1 className="text-5xl font-bold">Powering the Future</h1>
        <p className="mt-5 ">Explore the electrifying journey towards a sustainable tomorrow where innovation meets eco-consciousness, driving us towards a brighter future.</p>

        <div className="mt-10 flex items-center justify-around">
          <button className="bg-black bg-opacity-25 border border-black rounded-md py-2 px-10 hover:bg-black hover:bg-opacity-50 transition transition-duration-300">Shop Now</button>
          <button className="bg-black bg-opacity-25 border border-black rounded-md py-2 px-10 hover:bg-black hover:bg-opacity-50  transition transition-duration-300">Showroom</button>

        </div>
      </div>
    </>
  )
}

export default MainPageHtml