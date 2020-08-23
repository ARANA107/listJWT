import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';

function AppNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user } = auth;
    const authLink = (
        <Fragment>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{user? `Welcome ${user.name}` : ''}</strong>
                </span>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </Fragment>
    )


    return (
        <>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={toggle}></NavbarToggler>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                {isAuthenticated? authLink:guestLinks}

                        </Nav>
                    </Collapse>
                </Container>

            </Navbar>
        </>
    )
}

export default AppNavbar;
