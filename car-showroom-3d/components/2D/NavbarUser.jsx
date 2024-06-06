import Link from 'next/link'
import React from 'react'

const NavbarUser = () => {
  return (
    <nav class="bg-blue-800">
  <div class="mx-auto max-w-screen-xl px-4">
    <ul class="flex items-center justify-between py-4">
      <li>
        <ul class="flex items-center gap-x-7">
          <li>
            <a class="text-gray-50 hover:opacity-80">
              <div>
                <Link href={"/home"}>
                <span class="text-xl font-bold">E</span>
                <span class="text-xl font-bold text-white">Volutionary</span>
                </Link>
               
              </div>
            </a>
          </li>
        
            <Link href={'/shop/dashboard'} class="hidden md:block cursor-pointer text-sm font-medium text-gray-50 hover:text-gray-50/80">DashBoard</Link>
            <Link href={'/shop/cars'} class="hidden md:block cursor-pointer text-sm font-medium text-gray-50 hover:text-gray-50/80">Shop</Link>
            <Link href={'/shop/rent'} class="hidden md:block cursor-pointer text-sm font-medium text-gray-50 hover:text-gray-50/80">Rent A Car</Link>
            <Link href={'/shop/cart'} class="hidden md:block cursor-pointer text-sm font-medium text-gray-50 hover:text-gray-50/80">Cart</Link>
            <Link href={'/shop/contact'} class="hidden md:block cursor-pointer text-sm font-medium text-gray-50 hover:text-gray-50/80">Contact Us</Link>
         
        </ul>
      </li>
      <li>
        <ul class="flex items-center gap-x-4">
{/*           
          <li class="hidden md:block">
            <button o class="cursor-pointer bg-yellow-600 px-4 py-2 text-sm font-medium text-gray-50 text-gray-50 hover:text-gray-50/80">
              <a>Sign Out</a>
            </button>
          </li> */}
          <li class="md:hidden">
            <button
              aria-label="menu button"
              class="cursor-pointer bg-yellow-600 px-2 py-2 text-sm font-medium text-gray-50 text-gray-50 hover:text-gray-50/80"
            >
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div id="sidenavbar" class="duration-400 fixed top-0 right-0 z-50 h-full w-0 overflow-x-hidden transition-all">
    <div
      class="absolute right-0 top-0 z-50 h-full w-full backdrop-blur-lg"
    ></div>
    <div class="absolute right-0 top-0 z-50 h-full w-[300px] border-l bg-white shadow-lg">
      <div class="flex items-center justify-between border-b p-4">
        <a class="cursor-pointer">
          <div>
            <span class="text-xl font-bold">Gorkha</span>
            <span class="text-xl font-bold text-yellow-600">Job</span>
          </div>
        </a>
        <button
          aria-label="close"
          
          class="text-gray-900 hover:text-gray-900/70"
        >
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <div class="border-b p-4">
        <ul class="flex flex-col gap-y-3">
          <li>
            <a class="cursor-pointer text-sm font-medium text-gray-900 hover:text-gray-900/70">Find a Job</a>
          </li>
          <li>
            <a class="cursor-pointer text-sm font-medium text-gray-900 hover:text-gray-900/70">About</a>
          </li>
          <li>
            <a class="cursor-pointer text-sm font-medium text-gray-900 hover:text-gray-900/70">Contact</a>
          </li>
        </ul>
      </div>
      <div class="p-4">
        <a class="flex cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-gray-50 hover:bg-gray-900/70">
          <span>Make A Resume</span>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</nav>
  )
}

export default NavbarUser