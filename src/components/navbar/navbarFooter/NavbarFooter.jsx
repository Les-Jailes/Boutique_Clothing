import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import style from './navfooter.module.css';
import { navFooterItems } from '@/utils/navfooterItems';
import Link from 'next/link'

const NavFooter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalRef = useRef(null);
  let show  = false

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    const closeModal = () => {
      setSelectedCategory(null);
      setModalIsOpen(false);
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [modalIsOpen]);

  const openModal = (index) => {
    setSelectedCategory(index);
    setModalIsOpen(true);
  };

  const handleSubcategoryClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className={style.container}>
      {navFooterItems.map(({ title, id, link }) => (
      <Link key={id} href={link} className={style.link}>
        {title}
      </Link>
      
      ))}
      {show && (
        <div key={id} className={style.dropdownContainer}>
          
            <div
            onClick={() => openModal(id)}
            className={`${style.link} ${selectedCategory === id && style.selected} ${modalIsOpen && selectedCategory === id && style.modalOpen}`}
            key={id}
            > 
            </div>
          
        </div>
      )}

      {show && modalIsOpen && selectedCategory !== null && (
        <div ref={modalRef} className={`${style.modal} ${modalIsOpen && style.modalOpen}`}>
          {navFooterItems[selectedCategory]?.subcategories && (
            <div className={style.horizontalSubcategories}>
              {navFooterItems[selectedCategory].subcategories.map((subcategory) => (
                <li className={style.waypoint} key={subcategory.id}>
                  <div className={style.subcategoryItem} onClick={() => handleSubcategoryClick(subcategory.url)} key={subcategory.id}>
                    {subcategory.img && (
                      <Image
                        src={subcategory.img}
                        alt={subcategory.alt}
                        width={100}
                        height={100}
                      />
                    )}
                    <span className={style.nameSubCategory}>{subcategory.name}</span>
                  </div>
                </li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavFooter;
