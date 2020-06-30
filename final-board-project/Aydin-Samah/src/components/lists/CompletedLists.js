import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import Lists from './Lists';
import {Link, Redirect} from 'react-router-dom';
import {MDBCol, MDBRow, MDBContainer} from 'mdbreact';

const CompletedLists = ({CompletedLists, auth}) => {
  // console.log(CompletedLists);
  if (!auth.uid) return <Redirect to='/login' />;

  return (
    <MDBContainer style={{marginTop: "70px",}}>
      <MDBRow>
        {CompletedLists &&
          CompletedLists.map((list) => {
            // console.log(list);
            return (
              <MDBCol size='4'>
                <Link to={`completedlist/${list.id}`} key={list.id}>
                  <Lists list={list} />
                </Link>
              </MDBCol>
            );
          })}
      </MDBRow>
    </MDBContainer>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    CompletedLists: state.firestore.ordered.CompletedLists,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(() => ['CompletedLists'])
)(CompletedLists);
