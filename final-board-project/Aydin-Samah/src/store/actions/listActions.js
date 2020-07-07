import * as actionTypes from './actionTypes';
import {v4 as uuidv4} from 'uuid';

import 'firebase/firestore';
export const createList = (list) => {
  // console.log(list);
  return (dispatch, getState, {getFirestore}) => {
    // getfirestore from index middleware
    const fireStore = getFirestore(); //ref to firestore database
    fireStore
      .collection('lists')
      .add({
        ...list,
        createdAt: new Date(),
        isCompleted: false,
      })
      .then(() => {
        dispatch({type: actionTypes.ADD_LIST, list});
      })
      .catch((error) => {
        dispatch({type: 'CREATE_ERROR', error});
      });
  };
};
export const addItem = (item) => {
  const {name, amount, id} = item;
  // console.log(name, amount, id);

  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //make async call to database

    const firestore = getFirestore(); // ref to firestore api
    const firebase = getFirebase(); //ref to our data base
    firestore
      .collection('lists')
      .doc(id)
      .update({
        items: firebase.firestore.FieldValue.arrayUnion({
          name: name,
          amount: amount,
          id: uuidv4(),
        }),
      })
      .then(() => {
        dispatch({type: actionTypes.ADD_ITEM, item});
      })
      .catch((err) => {
        dispatch({type: 'UPDATE_UTENTE_ERROR', err});
      });
  };
};
/**washingtonRef.update({
    regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
}); */
export const deleteItem = (item) => {
  const {listId, itemId, itemName, itemAmount} = item;
  // console.log(item);
  // console.log(item);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //make async call to database

    const firestore = getFirestore(); // ref to firestore api
    const firebase = getFirebase(); //ref to our data base
    firestore
      .collection('lists')
      .doc(listId)
      .update({
        items: firebase.firestore.FieldValue.arrayRemove({
          id: itemId,
          name: itemName,
          amount: itemAmount,
        }),
      })
      .then(() => {
        dispatch({type: actionTypes.REMOVE_ITEM, item});
      })
      .catch((err) => {
        dispatch({type: 'ERROR_ON_DELETE', err});
      });
  };
};
export const editItem = (item) => {
  const {listId, itemId, itemName, itemAmount} = item;
  // console.log(name, amount, id);
  // console.log(itemName);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //make async call to database

    const firestore = getFirestore(); // ref to firestore api
    const firebase = getFirebase(); //ref to our data base

    firestore
      .collection('lists')
      .doc(listId)
      .update({
        items: firebase.firestore.FieldValue.arrayUnion({
          id: itemId,
          name: itemName,
          amount: itemAmount,
        }),
      })
      .then(() => {
        dispatch({type: actionTypes.EDIT_ITEM, item});
      })
      .catch((err) => {
        dispatch({type: 'ERROR_ON_DELETE', err});
      });
  };
};
export const createCompletedList = (list) => {
  const {title, listId, image} = list;
  return (dispatch, getState, {getFirestore}) => {
    // getfirestore from index middleware
    const fireStore = getFirestore(); //ref to firestore database
    fireStore
      .collection('CompletedLists')
      .doc(listId)
      .set({
        title: title,
        createdAt: new Date(),
        isCompleted: true,
        image: image,
        items: [],
      })
      .then(() => {
        dispatch({type: actionTypes.COMPLETED_LIST, list});
      })
      .catch((error) => {
        dispatch({type: 'CREATE_ERROR', error});
      });
  };
};

export const addItemToCompletedLists = (item) => {
  // console.log(item);
  const {listId} = item;
  // console.log(name, amount, id);
  // console.log(item.item.id, item.item.name, item.item.amount, listId);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //make async call to database

    const firestore = getFirestore(); // ref to firestore api
    const firebase = getFirebase(); //ref to our data base
    firestore
      .collection('CompletedLists')
      .doc(listId)
      .update({
        items: firebase.firestore.FieldValue.arrayUnion({
          name: item.item.name,
          amount: item.item.amount,
          id: item.item.id,
        }),
      })
      .then(() => {
        dispatch({type: actionTypes.ADD_ITEM, item});
      })
      .catch((err) => {
        dispatch({type: 'UPDATE_UTENTE_ERROR', err});
      });
  };
};
export const deleteDoc = (item) => {
  // console.log(item);

  // console.log(name, amount, id);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //make async call to database

    const firestore = getFirestore(); // ref to firestore api
    firestore
      .collection(item.collectionName)
      .doc(item.itemId)
      .delete()
      .then(() => {
        // console.log('hi');
        dispatch({type: actionTypes.DELETE_DOCUMENT, item});
      })
      .catch((err) => {
        dispatch({type: actionTypes.ERROR_DELETE_DOCUMENT, err});
      });
  };
};
