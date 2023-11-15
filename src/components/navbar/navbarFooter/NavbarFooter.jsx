import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import style from './navfooter.module.css';
import { navFooterItems } from '@/utils/navfooterItems';
import Modal from 'react-modal';

const NavFooter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = (index) => {
    console.log('Selected Index:', index);
    setSelectedCategory(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setModalIsOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => handleOutsideClick(e);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [modalIsOpen]);

  const handleSubcategoryClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className={style.container}>
      {navFooterItems.map((item, index) => (
        <div key={index} className={style.dropdownContainer}>
          <div
            onClick={() => openModal(index)}
            className={`${style.link} ${selectedCategory === index ? style.selected : ''} ${modalIsOpen && selectedCategory === index ? style.modalOpen : ''}`}
          >
            {item.title}
          </div>
        </div>
      ))}

      {modalIsOpen && selectedCategory !== null && (
        <div ref={modalRef} className={`${style.modal} ${style.modalOpen}`}>
          {navFooterItems[selectedCategory]?.subcategories && (
            <div className={style.horizontalSubcategories}>
              {navFooterItems[selectedCategory].subcategories.map((subcategory, index) => (
                <li className={style.waypoint} key={index}>
                  <div className={style.subcategoryItem} onClick={() => handleSubcategoryClick(subcategory.url)}>
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
