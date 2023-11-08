'use client'
import { signOut } from 'next-auth/react'
import styles from './page.module.css'
import React from 'react'

const page = () => {
  return (
    <div>
      User page
      <button onClick={signOut}>Log out</button>
    </div>
  )
}

export default page