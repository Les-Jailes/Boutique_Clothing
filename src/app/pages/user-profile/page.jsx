import React from 'react'
import { BiSolidUserCircle } from 'react-icons/bi';
import "@/app/pages/user-profile/UserProfile.css"

const profile = () => {
  return (
    <div>
       <div className='img'>
        <BiSolidUserCircle className='img__image-user' size={100} />
      </div>
      <div className='label-manager'>
        <form>
          <label className='label-manager__label-first-name'> First name:</label>
          <label className='label-manager__label-name' id='name'> Alex </label> <br></br>
          <label className='label-manager__label-last-name'> Last name:</label>
          <label className='label-manager__label-lname'id='lname'> Choquevolqueta </label><br></br>
          <label className='label-manager__label-password'> Password:</label>
          <label className='label-manager__lpassword' id='password'> ******** </label>
        </form>
      </div>
      <div className="filter-bar"><br></br>
        <select id="filterSelect">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        </select>
      </div>
    </div>
  )
}

export default profile
