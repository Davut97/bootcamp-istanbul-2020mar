import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import CompletedItem from './CompletedItem';
import {Redirect} from 'react-router-dom';
import {MDBContainer, MDBCardTitle, MDBRow, MDBCol} from 'mdbreact';
const CompletedList = (props) => {
  // console.log(props.list); // to see match.params.id
  const {items, auth} = props;
  // console.log(props);

  const id = props.match.params.id;
  const title = props.list ? props.list.title : null;
  if (auth.uid) {
    return (
      <MDBContainer className="my-12 mx-12" style={{marginTop:"30px"}}>
     
        <MDBCardTitle style={{ width: "22rem" }}>Items inside {title} list:</MDBCardTitle>
        {items &&
          items.map((item) => (
            <CompletedItem key={item.id} item={item} title={title} id={id} />
          ))}
          
      </MDBContainer>
    );
  } else {
    return <Redirect to='/login' />;
  }
};
const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  const id = ownProps.match.params.id;
  const CompletedLists = state.firestore.data.CompletedLists;
  const list = CompletedLists ? CompletedLists[id] : null;
  // console.log(lists, id);
  const items = state.firestore.data.CompletedLists
    ? state.firestore.data.CompletedLists[id].items
    : null;
  // console.log(items, list);
  return {
    list: list,
    items: items,
    auth: state.firebase.auth,
  };
};

export default compose(
  firestoreConnect(() => ['CompletedLists']),
  connect(mapStateToProps)
)(CompletedList);
