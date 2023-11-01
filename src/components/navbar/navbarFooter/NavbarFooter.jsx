import React from 'react'
import style from './navfooter.module.css'
import { navFooterItems } from '@/utils/navfooterItems'
import Link from 'next/link'

const NavFooter = () => {
  return (
    <div className={style.container}>
        {navFooterItems.map((item, index)=>{
          return <Link key={index} href={item.url} className={style.link}>{item.title}</Link>
        })}
    </div>
  )
}

export default NavFooter