'use client'
import 'dotenv/config'
import React,{useState, useEffect} from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import {AiOutlineUser,AiOutlineLock, AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import Image from 'next/image'

const Login = () => {
  
  return (
    <div className={styles.container}>
      <form className={styles.form} >
          <h1 className={styles.title}>CONTACT US</h1>
          <div className={styles.inputBox}>
            <AiOutlineUser className={styles.icon} />
            <input
              type="text"
              maxLength={100}
              placeholder="Name"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputBox}>
            <AiOutlineLock className={styles.icon} />
            <input
              type={'text'}
              placeholder="Telephone"
              className={styles.input}
              maxLength={20}
              required
            />
          </div>
          
          <div className={styles.inputBox}>
            <AiOutlineUser className={styles.icon} />
            <input
              type="email"
              maxLength={100}
              placeholder="Email"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.textAreaBox}>
            <textarea name="comments" id="" cols="30" rows="10" placeholder='Comments' className={styles.areatext}>

            </textarea>
          </div>
          <button className={styles.button}>Send</button>
        </form>
        <div className={styles.imgContainer}>
            <Image 
                src={"/contactus_bg.jpg"}
                height={400}
                width={400}
                alt='contact us page'
                className={styles.img}
            />
        </div>
    </div>
  )
}

export default Login