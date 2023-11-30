import CartButton from "../Cart/CartButton";
import SideMenu from "../SideMenu/SideMenu";
import User from "../User/User";
import '@/css/Navbar/MenuItems.css'

const MenuItems = ({ isLogged, handleLogOut }) => {

  return (
    <div className="menu-items-container">
      <User isLogged={ isLogged } handleLogOut={ handleLogOut } />
      <CartButton />
      <SideMenu />
    </div>
  );
};

export default MenuItems;