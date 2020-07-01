import React, {useState} from 'react';
import LogIn from './Links/LogIn';
import LogOut from './Links/LogOut';
import {connect} from 'react-redux';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
} from 'mdbreact';
import './Links/Navbar.css';
import LogOutIcon from './LinksIcons/LogOutIcon';
const Navbar = (props) => {
  const {auth, profile} = props;
  const [isOpen, setIsOPen] = useState(false);
  const toggleCollapse = () => {
    setIsOPen(!isOpen);
  };

  const links = auth.uid ? (
    <>
      <LogIn profile={profile} />{' '}
      <MDBNavLink to='/completedlists'>Completed Lists</MDBNavLink>
    </>
  ) : (
    <LogOut />
  );
  const LogOuticon = auth.uid ? <LogOutIcon /> : null;
  return (
    <div>
      <MDBNavbar
        className='navbar'
        color='#ff4081 pink accent-2'
        dark
        expand='md'>
        <MDBNavbarBrand>
          <strong className='white-text'>Trelleo</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id='navbarCollapse3' isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to='/' className='white-text'>
                HOME
              </MDBNavLink>
            </MDBNavItem>

            {links}
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to='#!' className='white-text'>
                {LogOuticon}
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem></MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
