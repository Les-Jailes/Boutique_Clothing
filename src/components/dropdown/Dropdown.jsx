import Link from 'next/link';
import style from './dropdown.module.css'
const Dropdown = ({ submenus, dropdown }) => {
    return (
        <ul className={`${style.dropdown} ${dropdown ? style.show : ""}`}>
        {submenus.map((submenu, index) => (
          <li key={index} className={style.menuItems}>
            <Link className={style.link} href={submenu.url}>{submenu.title}</Link>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Dropdown;