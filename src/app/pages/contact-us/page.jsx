'use client'
import React, { useState } from 'react';
import styles from './page.module.css';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2';
import api from '@/app/api/api';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    comments: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    telephone: '',
    email: '',
    comments: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let maxLength;
    switch (name) {
      case 'name':
        maxLength = 100;
        break;
      case 'telephone':
        maxLength = 10;
        break;
      case 'email':
        maxLength = 200;
        break;
      case 'comments':
        maxLength = 600;
        break;
      default:
        maxLength = 200;
        break;
    }
    const truncatedValue = value.slice(0, maxLength);

    setFormData({
      ...formData,
      [name]: truncatedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        const response = await api.post('/Email', formData);
        Swal.fire({
          title: 'Success!',
          text: `Email from ${formData.email} has been correctly sent.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {
      name: '',
      telephone: '',
      email: '',
      comments: '',
    };

    if (!data.name.trim()) {
      errors.name = 'Field can not be empty';
    }

    if (data.telephone.length > 10) {
      errors.telephone = 'Field can not be more than 10 characters';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Email format not valid';
    } else if (data.email.length > 200) {
      errors.email = 'Field can not be more than 200 characters';
    }

    if (!data.comments.trim()) {
      errors.comments = 'Field can not be empty';
    } else if (data.comments.length > 400) {
      errors.comments = 'Field can not be more than 400 characters';
    }

    return errors;
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>CONTACT US</h1>
        <div className={styles.inputBox}>
          <AiOutlineUser className={styles.icon} />
          <input
            type="text"
            maxLength={100}
            placeholder="Name"
            className={styles.input}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.error}>{errors.name}</div>

        <div className={styles.inputBox}>
          <AiOutlineLock className={styles.icon} />
          <input
            type="text"
            placeholder="Telephone"
            className={styles.input}
            maxLength={10}
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.error}>{errors.telephone}</div>

        <div className={styles.inputBox}>
          <AiOutlineUser className={styles.icon} />
          <input
            type="email"
            maxLength={200}
            placeholder="Email"
            className={styles.input}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.error}>{errors.email}</div>

        <div className={styles.textAreaBox}>
          <textarea
            name="comments"
            id=""
            cols="30"
            rows="10"
            placeholder="Comments"
            className={styles.areatext}
            value={formData.comments}
            onChange={handleInputChange}
            maxLength={600}
          ></textarea>
        </div>
        <div className={styles.error}>{errors.comments}</div>

        <button className={styles.button} type="submit">
          Send
        </button>
      </form>
      <div className={styles.imgContainer}>
        <Image
          src={"/contactus_bg.jpg"}
          height={400}
          width={400}
          alt="contact us page"
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default Page;