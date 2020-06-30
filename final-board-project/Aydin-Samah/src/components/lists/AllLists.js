import React, {useState} from 'react';
import Lists from './Lists';
import {Link, Redirect} from 'react-router-dom';
import {
  createCompletedList,
  addItemToCompletedLists,
  deleteDoc,
} from '../../store/actions/listActions';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {MDBBtn, MDBCol, MDBRow, MDBIcon, MDBContainer} from 'mdbreact';
const AllLists = (props) => {
  // console.log(props);
  let {lists, auth} = props;
  const [isOPen, setIsOpen] = useState(false);

  if (!auth.uid) return <Redirect to='/signin' />;
  const HandleIsOpen = (e) => {
    e.preventDefault();
    // console.log(isOPen);
    setIsOpen(!isOPen);
    // console.log(isOPen);
  };

  return (
    <MDBContainer>
      <div>
        <MDBBtn
          type='button'
          onClick={(e) => HandleIsOpen(e)}
          style={{
            display: 'block',
            width: '100px',
            margin: '0 auto',
            marginTop: '-52px',
            marginLeft: '60px',
          }}>
          <MDBIcon icon='sync-alt' />
        </MDBBtn>
      </div>

      <MDBRow>
        {lists &&
          lists.map((list) => {
            // console.log(list);
            return (
              <MDBCol key={list.id} size='4'>
                <Link to={`list/${list.id}`} key={list.id}>
                  <Lists key={list.id} list={list} isOpen={isOPen} />
                </Link>
              </MDBCol>
            );
          })}
      </MDBRow>
    </MDBContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCompletedList: (list) => dispatch(createCompletedList(list)),
    addItemToCompletedLists: (items) =>
      dispatch(addItemToCompletedLists(items)),
    deleteDoc: (items) => dispatch(deleteDoc(items)),
  };
};
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
  };
};
export default compose(
  firestoreConnect(() => ['CompletedLists']),
  connect(mapStateToProps, mapDispatchToProps)
)(AllLists);
