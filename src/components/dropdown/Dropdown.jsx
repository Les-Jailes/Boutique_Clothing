import style from './dropdown.module.css'
const Dropdown = ({ submenus, dropdown }) => {
    return (
        <ul className={`${style.dropdown} ${dropdown ? style.show : ""}`}>
        {submenus.map((submenu, index) => (
          <li key={index} className={style.menuItems}>
            <a href={submenu.url}>{submenu.title}</a>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Dropdown;