'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { BiSolidUser, BiSolidUserCircle } from 'react-icons/bi';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '@/app/pages/user-profile/UserProfile.css'
import api from '@/app/api/api'


const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('default');
  const [image, setUserImage] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [user, setuser] = useState([])
  const session = useSession()
  console.log(session)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
  
    if (id === 'name') {
      setName(value);
    } else if (id === 'lastName') {
      setLastName(value);
    } else if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };
  

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        name,
        lastName,
        email,
        password,
        gender,
      };
  
      api.put(`/User/email`, updatedUserData.email);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
    setIsEditing(false);

  };
  
  const getUser = async () => {
    try {
      const u = await api.get('/User/email/' + session.data.user.email);
      console.log(u);
      return u.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
  

  useEffect(() => {
    const status = session.status;
  
    const fetchData = async () => {
      if (session && status === 'authenticated') {
        try {
          const user = await getUser();
          console.log(user);
          setEmail(session.data.user.email);
          if (user !== null && user.lastName !== undefined || user != null && user.name !== undefined
            || user != null && user.password !== undefined || user != null && user.gender !== undefined) {
            setLastName(user.lastName);
            setName(user.name);
            setPassword(user.password);
            setGender(user.gender);            
          }   
          if (user !== null && user.imagePath) {
            // Si el usuario tiene una imagen, actualiza el estado con la URL
            // Asegúrate de tener un estado para la imagen, como userImage
            setUserImage(user.imagePath);
        } catch (error) {
          console.error("Error in fetching user data:", error);
        }
      }
    };
  
    fetchData();
  }, [session]);
  

  const handleSelectChange = (e) => {
    setGender(e.target.value);
  };

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  return (
    <div className='profile-container'>
      <form action=''>
        <h1>Profile</h1>

        <div>
          <BiSolidUserCircle className='image-user'
          values='image'/>
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
            disabled={!isEditing}
          />
          <BiSolidUser className='icon' />
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
          disabled={!isEditing}
        />
          <BiSolidUser className='icon' />
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
            disabled={!isEditing}
          />
          <MdOutlineAlternateEmail className='icon' />
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
            disabled={!isEditing}
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
            disabled={!isEditing}
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value} className='options'>
                {option.label}
              </option>
            ))}
          </select>
          <BiSolidUser className='iconGender' />
        </div>

        <div>
          {isEditing ? (
            <button className='button-edit' onClick={handleSave}>Save Profile</button>
          ) : (
            <button className='button-edit' onClick={handleEdit}>Edit Profile</button>
          )}
        </div>
      </form>
    </div>
  );
}
export default Profile;
