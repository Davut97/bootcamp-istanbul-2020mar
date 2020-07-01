import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../../store/actions/authActions';
import {MDBNavItem, MDBIcon} from 'mdbreact';
const LogOutIcon = (props) => {
  return (
    <>
      <MDBNavItem
        onClick={props.OnSignOut}
        className='waves-effect waves-light'>
        <MDBIcon icon='sign-out-alt' />{' '}
      </MDBNavItem>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnSignOut: () => dispatch(signOut()),
  };
};
export default connect(null, mapDispatchToProps)(LogOutIcon);
