'use client'

import React from 'react'
import { BiSolidUser, BiSolidUserCircle } from 'react-icons/bi';
import { BsLockFill } from 'react-icons/bs';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import '@/app/pages/user-profile/UserProfile.css'

const profile = () => {
  return (
    <div className='profile-container'> 
      <form action=''>
        <h1 className='title'>Profile</h1>

        <div>
        <BiSolidUserCircle className='image-user' size={200} />
        </div>
         
        <div className='input-box'>
          <input type="text" placeholder='Name' required className='input-field'/>
          <BiSolidUser className='icon'/>
        </div>

        <div className='input-box'>
          <input type="text" placeholder='Lastname' required className='input-field'/>
          <BiSolidUser className='icon'/>
        </div>

        <div className='input-box'>
          <input type="text"
          placeholder='Email' required className='input-field'/>
          <MdOutlineAlternateEmail className='icon'/>
        </div>

        <div className='input-box'>
          <input type="password"
          placeholder='Password' required className='input-field'/>
          <BsLockFill className='icon'/>
        </div>

        <div className='input-box'>
        <select id="filterSelect" className='filter-bar'>
          <option value="option1" className='options'>Gender</option>
          <option value="option2" className='options'>Male</option>
          <option value="option3" className='options'>Female</option>
          </select>
        </div>

      </form>
    </div>
  )
}

export default profile