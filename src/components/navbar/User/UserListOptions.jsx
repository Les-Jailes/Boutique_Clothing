import React from "react";
import '@/css/UserOption/UserListOptions.css'
import userMenuItems from '@/utils/UserMenuItems.json'
import UserMenuItem from "./UserMenuItem";

const UserListOptions = () => {
	console.log(userMenuItems)
  return (
		<div className="user-list-options-container">
			{
				userMenuItems.map((menuItem, index) => {
					return <UserMenuItem menuItem={ menuItem } key={ index } />
				})
			}
		</div>
	)
};

export default UserListOptions;
