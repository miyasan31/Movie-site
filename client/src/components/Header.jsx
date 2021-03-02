import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const Header = () => {
	return (
		<Navbar color="primay" dark className="mb-4">
			<NavbarBrand href="/">Movie List</NavbarBrand>
		</Navbar>
	);
};
export default Header;
