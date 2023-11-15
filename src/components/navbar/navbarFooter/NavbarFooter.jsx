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
    window.location.href = url; // Redirige a la URL de la subcategoría
  };

  return (
    <div className={style.container}>
      {navFooterItems.map((item, index) => (
        <div key={index} className={style.dropdownContainer}>
          <div
            onClick={() => openModal(index)}
            className={`${style.link} ${selectedCategory === index ? style.selected : ''}`}
          >
            {item.title}
          </div>
        </div>
      ))}

      {modalIsOpen && selectedCategory !== null && (
        <div ref={modalRef} className={style.modal}>
          {navFooterItems[selectedCategory]?.subcategories && (
            <div className={style.horizontalSubcategories}>
              <ul>
                {navFooterItems[selectedCategory].subcategories.map((subcategory, index) => (
                  <li key={index}>
                    <div className={style.subcategoryItem} onClick={() => handleSubcategoryClick(subcategory.url)}>
                      {subcategory.img && <img src={subcategory.img} alt={subcategory.alt} />}
                      <span>{subcategory.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavFooter;
