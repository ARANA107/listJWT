
import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import {logout} from '../../actions/authActions';
import { useDispatch } from 'react-redux';

function Logout() {
    const dispatch = useDispatch();
    const logoutUser = () =>dispatch(logout())

    return (
        <Fragment>
        <NavLink onClick={logoutUser} href="#">
          Logout
        </NavLink>
      </Fragment>
    )
}

export default Logout;
