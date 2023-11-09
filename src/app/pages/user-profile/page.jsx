'use client'
import React, { useState } from 'react'
import { BiSolidUser, BiSolidUserCircle } from 'react-icons/bi';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '@/app/pages/user-profile/UserProfile.css'

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('default');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e) => {
    setGender(e.target.value);
  };

  const genderOptions = [
    { value: 'default', label: 'Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  return (
    <div className='profile-container'> 
      <form action=''>
        <h1 className='title'>Profile</h1>

        <div>
          <BiSolidUserCircle className='image-user' size={200} />
        </div>
        
        <div className='input-box'>
          <input
            type="text"
            placeholder='Name'
            id='name'
            value={name}
            onChange={handleInputChange}
            required
            className='input-field'
            disabled
          />
          <BiSolidUser className='icon'/>
        </div>

        <div className='input-box'>
          <input
            type="text"
            placeholder='Lastname'
            id='lastName'
            value={lastName}
            onChange={handleInputChange}
            required
            className='input-field'
            disabled
          />
          <BiSolidUser className='icon'/>
        </div>

        <div className='input-box'>
          <input
            type="text"
            placeholder='Email'
            id='email'
            value={email}
            onChange={handleInputChange}
            required
            className='input-field'
            disabled
          />
          <MdOutlineAlternateEmail className='icon'/>
        </div>

        <div className='input-box'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            id='password'
            value={password}
            onChange={handleInputChange}
            required
            className='input-field'
            disabled
          />
          {showPassword ? (
            <AiFillEyeInvisible className='icon' onClick={togglePasswordVisibility} />
          ) : (
            <AiFillEye className='icon' onClick={togglePasswordVisibility} />
          )}

          <select
            id="filterSelect"
            className='filter-bar'
            value={gender}
            onChange={handleSelectChange}
            disabled
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value} className='options'>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

export default Profile;
