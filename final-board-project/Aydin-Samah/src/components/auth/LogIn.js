import React, {useState} from 'react';
import {signIn} from '../../store/actions/authActions';
import {connect} from 'react-redux';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';
import {Redirect} from 'react-router-dom';

const LogIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  // console.log(props.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSignIn({email, password});
    props.history.push('/');
  };
  if (props.auth.uid) return <Redirect to='/' />;
  return (
    <MDBContainer
      style={{width: '450px', marginTop: '60px', marginBottom: '60px'}}>
      <MDBRow>
        <MDBCol md='12' style={{width: '300px', margin: 'auto 0'}}>
          <MDBCard>
            <div className='header pt-3 grey lighten-2'>
              <MDBRow className='d-flex justify-content-start'>
                <h3 className='deep-grey-text mt-3 mb-4 pb-1 mx-5'>Log in</h3>
              </MDBRow>
            </div>
            <MDBCardBody className='mx-4 mt-4'>
              <MDBInput
                label='Your email'
                group
                type='text'
                validate
                onChange={handleEmail}
              />
              <MDBInput
                label='Your password'
                group
                type='password'
                validate
                containerClass='mb-0'
                onChange={handlePassword}
              />
              <p className='font-small grey-text d-flex justify-content-end'>
                Forgot
                <a href='#!' className='dark-grey-text font-weight-bold ml-1'>
                  Password?
                </a>
              </p>
              <div className='text-center mb-4 mt-5'>
                <MDBBtn
                  color='danger'
                  type='button'
                  className='btn-block z-depth-2'
                  onClick={handleSubmit}>
                  Log in
                </MDBBtn>
                <div>{props.authError ? <p>{props.authError}</p> : null}</div>
              </div>
              <p className='font-small grey-text d-flex justify-content-center'>
                Don't have an account?
                <a href='#!' className='dark-grey-text font-weight-bold ml-1'>
                  Sign up
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (credentials) => dispatch(signIn(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

// <MDBContainer>
//       <MDBRow>
//         <MDBCol md='6'>
//           <form>
//             <p className='h5 text-center mb-4'>Log In</p>
//             <div className='grey-text'>
//               <MDBInput
//                 label='Type your email'
//                 icon='envelope'
//                 group
//                 type='email'
//                 validate
//                 error='wrong'
//                 success='right'
//                 onChange={handleEmail}
//               />
//               <MDBInput
//                 label='Type your password'
//                 icon='lock'
//                 group
//                 type='password'
//                 validate
//                 onChange={handlePassword}
//               />
//             </div>
//             <div className='text-center'>
//               <MDBBtn onClick={handleSubmit}>Login</MDBBtn>
//               <div>{props.authError ? <p>{props.authError}</p> : null}</div>
//             </div>
//           </form>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>

// const FormPage = () => {
// return (
// <MDBContainer>
//   <MDBRow>
//     <MDBCol md="6">
//       <form>
//         <p className="h5 text-center mb-4">Sign in</p>
//         <div className="grey-text">
//           <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
//             success="right" />
//           <MDBInput label="Type your password" icon="lock" group type="password" validate />
//         </div>
//         <div className="text-center">
//           <MDBBtn>Login</MDBBtn>
//         </div>
//       </form>
//     </MDBCol>
//   </MDBRow>
// </MDBContainer>
// );
// };
