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

  return (
    <div className={style.container}>
      {navFooterItems.map((item, index) => (
        <div key={index} className={style.dropdownContainer}>
          <div
            onClick={() => openModal(index)}
            className={`${style.link} ${
              selectedCategory === index ? style.selected : ''
            }`}
          >
            {item.title}
          </div>
        </div>
      ))}

      {modalIsOpen && (
        <div
          ref={modalRef}
          className={style.modal}
        >
          <h2>Categoría seleccionada</h2>
          <p>¡La categoría {navFooterItems[selectedCategory]?.title} fue seleccionada! Aquí puedes agregar más detalles.</p>
          <button onClick={closeModal}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default NavFooter;
