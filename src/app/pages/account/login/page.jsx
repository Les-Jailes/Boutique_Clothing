'use client'
import React from 'react'
import styles from './page.module.css'
import { signIn, useSession } from 'next-auth/react'
const Login = () => {
  const session = useSession()
  console.log(session)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    alert(email +" " + password)
    signIn("credentials", {email, password})
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' className={styles.input} required/>
        <input type="text" placeholder='Password' className={styles.input} required/>
        <button className={styles.button}>Log in</button>
      </form>
    </div>
  )
}

export default Login