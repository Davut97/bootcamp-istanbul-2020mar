import React, {useState} from 'react';
import {signUp} from '../../store/actions/authActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.OnSignUp({email, password, firstName, lastName});
  };
  const {auth, authError} = props;
  if (auth.uid) return <Redirect to='/' />;

  return (
    <div>
      <MDBContainer style={{width: '450px', marginTop: "60px", marginBottom: "60px"}}>
        <MDBRow>
          <MDBCol
            md='12'
            style={{
              margin: '0 auto',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className='h4 text-center py-4'>Sign up</p>
                  <div className='grey-text'>
                    <MDBInput
                      label='First Name'
                      icon='user'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      id='firstName'
                      onChange={handleChangeFirstName}
                    />
                    <MDBInput
                      label='Last Name'
                      icon='user'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      id='lastName'
                      onChange={handleChangeLastName}
                    />
                    <MDBInput
                      label='Your email'
                      icon='envelope'
                      group
                      type='email'
                      validate
                      error='wrong'
                      success='right'
                      id='email'
                      onChange={handleChangeEmail}
                    />
                    <MDBInput
                      label='Your password'
                      icon='lock'
                      group
                      type='password'
                      validate
                      id='password'
                      onChange={handleChangePassword}
                    />
                  </div>
                  <div className='text-center py-4 mt-3'>
                    <MDBBtn
                      color='danger'
                      type='submit'
                      onClick={(e) => handleSubmit(e)}>
                      Register
                    </MDBBtn>
                  </div>
                  <div>{authError ? <p>{authError}</p> : null}</div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    OnSignUp: (newUser) => dispatch(signUp(newUser)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

// <form onSubmit={handleSubmit} className='white'>
//         <h5>Sign Up</h5>
//         <div>
//           <label>Email</label>
//           <input type='email' id='email' onChange={handleChangeEmail} />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type='password'
//             id='password'
//             onChange={handleChangePassword}
//           />
//         </div>
//         <div>
//           <label>First Name</label>
//           <input type='text' id='firstName' onChange={handleChangeFirstName} />
//         </div>
//         <div>
//           <label>Last Name</label>
//           <input type='text' id='lastName' onChange={handleChangeLastName} />
//         </div>
//         <div>
//           <button>Sign Up</button>
//         </div>
//         <div>{authError ? <p>{authError}</p> : null}</div>
//       </form>
