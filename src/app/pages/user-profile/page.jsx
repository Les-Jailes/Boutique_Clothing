'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { BiSolidUser, BiSolidUserCircle,BiSolidUserDetail } from 'react-icons/bi';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { validateEmail, validatePassword, validateTextField, validateCiField } from '@/utils/formValidations';
import '@/app/pages/user-profile/UserProfile.css'
import api from '@/app/api/api';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ci, setCi] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('default');
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useState([])
  const session = useSession()

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
    } else if (id === 'ci') {
      setCi(value);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const [isEmailValid, emailErrorMessage] = validateEmail(email);
      const [isPasswordValid, passwordErrorMessage] = validatePassword(password);
      const [isCiValid, ciErrorMessage] = validateCiField(ci);
      const [isNameValid, nameErrorMessage] = validateTextField(name, 'Name');
      const [isLastNameValid, lastNameErrorMessage] = validateTextField(lastName, 'Last Name');

      if (!isEmailValid) {
        console.error('Email Validation Error:', emailErrorMessage);
        return;
      }
      if (!isPasswordValid) {
        console.error('Password Validation Error:', passwordErrorMessage);
        return;
      }
      if (!isCiValid) {
        console.error('CI Validation Error:', ciErrorMessage);
        return;
      }
      if (!isNameValid) {
        console.error('Name Validation Error:', nameErrorMessage);
        return;
      }
      if (!isLastNameValid) {
        console.error('Last Name Validation Error:', lastNameErrorMessage);
        return;
      }
      const userUpdate = await getUser();

      if (userUpdate !== null && userUpdate._id !== undefined || user !== null && user.lastName !== undefined || user != null && user.name !== undefined
        || user != null && user.password !== undefined || user != null && user.gender !== undefined || user != null && user.ci !== undefined) {
        const userId = userUpdate._id;
        const data = {
          ci: ci,
          name: name,
          lastName: lastName,
          password: password,
          gender: gender
        };

        const userUpdateResponse = await api.put(`/User/${userId}`, data);
        console.log('PUT request successful:', userUpdateResponse.data);

        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
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
          setEmail(session.data.user.email);
          if (user !== null && user.lastName !== undefined || user != null && user.name !== undefined
            || user != null && user.password !== undefined || user != null && user.gender !== undefined || user != null && user.ci !== undefined) {
            setCi(user.ci);
            setLastName(user.lastName);
            setName(user.name);
            setPassword(user.password);
            setGender(user.gender);
          }
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
          <BiSolidUserCircle className='image-user'/>
        </div>

        <div className='input-box'>
          <input
            type="text"
            placeholder='CI'
            id='ci'
            value={ci}
            onChange={handleInputChange}
            required
            className='input-field'
            disabled={!isEditing}
          />
          <BiSolidUserDetail className='icon'/>
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            <button className='button-edit' onClick={handleSave}>
              <span>Save Profile</span>
              </button>
          ) : (
            <button className='button-edit' onClick={handleEdit}>
              <span>Edit Profile</span>
              </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default Profile;
