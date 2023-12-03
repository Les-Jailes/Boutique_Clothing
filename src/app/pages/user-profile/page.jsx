'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { BiSolidUser, BiSolidUserCircle, BiSolidUserDetail } from 'react-icons/bi';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { validateTextField, validateCiField } from '@/utils/formValidations';
import '@/app/pages/user-profile/UserProfile.css';
import api from '@/app/api/api';
import "@/css/OrderHistoryLoader/OrderHistoryLoaderTable.css";
const Profile = () => {
  const [ci, setCi] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('default');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [validationMessages, setValidationMessages] = useState({
    ci: '',
    name: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!redirected && session.status === "unauthenticated") {
      window.location.href = '/pages/account/login';
      setRedirected(true);
      localStorage.setItem("showLogInRequiredForProfile", "true");
    }
  }, [session, redirected]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === 'name') {
      setName(value);
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        name: '' 
      }));
    } else if (id === 'lastName') {
      setLastName(value);
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        lastName: '' 
      }));
    }  else if (id === 'ci') {
      setCi(value);
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        ci: ''
      }));
    }
  };

  const handleFocus = (field) => {
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [field]: ''
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const [isCiValid, ciErrorMessage] = validateCiField(ci);
      const [isNameValid, nameErrorMessage] = validateTextField(name, 'Name');
      const [isLastNameValid, lastNameErrorMessage] = validateTextField(lastName, 'Last Name');

      if (!isCiValid) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          ci: ciErrorMessage
        }));
        return;
      }
      if (!isNameValid) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          name: nameErrorMessage
        }));
        return;
      }
      if (!isLastNameValid) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          lastName: lastNameErrorMessage
        }));
        return;
      }
      const userUpdate = await getUser();

      if (userUpdate !== null && userUpdate._id !== undefined || user !== null && user.lastName !== undefined || user != null && user.name !== undefined
        || user != null && user.gender !== undefined || user != null && user.ci !== undefined) {
        const userId = userUpdate._id;
        const data = {
          ci: ci,
          name: name,
          lastName: lastName,
          gender: gender
        };

        const userUpdateResponse = await api.put(`/User/${userId}`, data);
        
        setValidationMessages({
          ci: '',
          name: '',
          lastName: ''
        });

        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const getUser = useCallback(async () => {
    try {
      if (session && session.data && session.data.user) {
        const u = await api.get('/User/email/' + session.data.user.email);
        return u.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.status === 'authenticated') {
        try {
          const fetchedUser = await getUser();
          setEmail(session.data.user.email);
          if (fetchedUser !== null && fetchedUser.lastName !== undefined || fetchedUser != null && fetchedUser.name !== undefined
            || fetchedUser != null && fetchedUser.gender !== undefined || fetchedUser != null && fetchedUser.ci !== undefined) {
            setCi(fetchedUser.ci);
            setLastName(fetchedUser.lastName);
            setName(fetchedUser.name);
            setGender(fetchedUser.gender);
          }
        } catch (error) {
          console.error("Error in fetching user data:", error);
        }finally {
          setIsLoading(false);
        }
      } else {
        setTimeout(() => {
        setIsLoading(false);
      }, 4000);
      }
    };

    fetchData();
  }, [session, getUser]);

  if (isLoading) {
    return (
      <div className="container-loader">
        <span className="loader"></span>
      </div>
    );
  }

  const handleSelectChange = (e) => {
    setGender(e.target.value);
  };

  const genderOptions = [
    
    { value: 'Rather not say', label: 'Rather not say' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  return (
    <div className='profile-container_user'>
    <div className='profile-container'>
      <form action=''>
        <h1>Profile</h1>

        <div>
          <BiSolidUserCircle className='image-user'/>
        </div>

        <div className='input-box'>
          <input
            type="text"
            placeholder='CI *'
            id='ci'
            value={ci}
            onChange={handleInputChange}
            onFocus={() => handleFocus('ci')}
            required
            className='input-field'
            disabled={!isEditing}
          />
          <BiSolidUserDetail className='icon'/>
        </div>
        <div className='validation-message'>
          {validationMessages.ci}
        </div>

        <div className='input-box'>
          <input
            type="text"
            placeholder='Name *'
            id='name'
            value={name}
            onChange={handleInputChange}
            onFocus={() => handleFocus('name')}
            required
            className='input-field'
            disabled={!isEditing}
          />
          <BiSolidUser className='icon'/>
        </div>
        <div className='validation-message'>
          {validationMessages.name}
        </div>
        <div className='input-box'>
          <input
            type="text"
            placeholder='Lastname *'
            id='lastName'
            value={lastName}
            onChange={handleInputChange}
            onFocus={() => handleFocus('lastName')}
            required
            className='input-field'
            disabled={!isEditing}
          />
          <BiSolidUser className='icon'/>
        </div>
        <div className='validation-message'>
          {validationMessages.lastName}
        </div>
        <div className='input-box'>
          <input
            type="text"
            placeholder='Email *'
            id='email'
            value={email}
            required
            className='input-field'
            disabled
          />
          <MdOutlineAlternateEmail className='icon'/>
        </div>
        <div className='input-box'>
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
        {session?.status === 'authenticated' ? (
          isEditing ? (
            <button className='button-edit' onClick={handleSave}>
              <span>Save Profile</span>
            </button>
          ) : (
            <button className='button-edit' onClick={handleEdit}>
                <span>Edit Profile</span>
              </button>
            )
            ) : (
              <button className='button-edit' disabled>
                <span>Edit Profile</span>
              </button>
            )
          }
        </div>
      </form>
    </div>
    </div>
  );
}

export default Profile;