
import React from 'react'
import { BiSolidUser, BiSolidUserCircle } from 'react-icons/bi';
import { BsLockFill } from 'react-icons/bs';
import { MdOutlineAlternateEmail } from 'react-icons/md';


const profile = () => {
  return (
    <div className='profile-container'> 
      <form action=''>
        <h1>Login</h1>

        <div>
        <BiSolidUserCircle className='img__image-user' size={100} /> <br></br>
        </div>
         
        <div className='input-box'>
          <input type="text" placeholder='Name' required/>
          <BiSolidUser/>
        </div>

        <div className='input-box'>
          <input type="text"
          placeholder='Lastname' required/>
          <BiSolidUser/>
        </div>

        <div className='input-box'>
          <input type="text"
          placeholder='Email' required/>
          <MdOutlineAlternateEmail/>
        </div>

        <div className='input-box'>
          <input type="password"
          placeholder='Password' required/>
          <BsLockFill/>
        </div>

        <div>
        <select id="filterSelect" className='input-box'>
          <option value="option1">Gender</option>
          <option value="option2">Male</option>
          <option value="option3">Female</option>
          </select>
        </div>

      </form>
    </div>
  )
}

export default profile