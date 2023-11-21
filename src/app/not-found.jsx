import React from 'react'
import Link from 'next/link';

const Atfound = () => {
  return (
    <div className='nf-container'>
        <div className='nf-top'>
            <h2 className='nf-status'>404</h2>
            <h1 className='nf-title'>Page Not Found</h1>
        </div>
        <div className='nf-bottom'>
            <p className='nf-message'>Oops, the page you were looking for could not be found. Please go back to the home page to discover a wide range of fashionable clothes.</p>
            <Link href={"/"} className='nf-button'>GO TO HOME PAGE</Link>
        </div>
    </div>
  )
}

export default Atfound