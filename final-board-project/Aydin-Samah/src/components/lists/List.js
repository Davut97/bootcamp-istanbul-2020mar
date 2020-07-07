import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {addItem, deleteItem, editItem} from '../../store/actions/listActions';
import Items from './Items';
import {Redirect} from 'react-router-dom';
import {MDBBtn, MDBInput} from 'mdbreact';

const List = (props) => {
  // console.log(props.list); // to see match.params.id
  const {items, auth} = props;
  // console.log(props);
  console.log(props);
  const id = props.match.params.id;
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [fetchedItems, setFetchedItems] = useState(items);
  const [editItemIsOpen, setEditItemIsOpen] = useState(false);
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(name, amount, id);
    props.addItem({name: name, amount: amount, id: id});
  };
  const handleDeleteItem = (event, itemId, itemName, itemAmount) => {
    console.log(itemId, itemName, itemAmount);

    props.deleteItem({
      listId: id,
      itemId: itemId,
      itemName: itemName,
      itemAmount: itemAmount,
    });
  };
  const handleEditItem = (listId, itemId, itemName, itemAmount) => {
    console.log(listId, itemId, itemName, itemAmount);
    props.editItem({
      listId: id,
      itemId: itemId,
      itemName: itemName,
      itemAmount: itemAmount,
    });
  };
  const handleEditIsOpen = (e) => {
    e.preventDefault();
    setEditItemIsOpen(!editItemIsOpen);
    // console.log(editItemIsOpen);
  };
  useEffect(() => {
    setFetchedItems(items);
  }, [items]);
  const title = props.list ? props.list.title : null;
  if (auth.uid) {
    return (
      <div>
        <div>
          <form style={{width: '400px', margin: 'auto', marginTop: '60px'}}>
            <h5>Add item to {title} list</h5>
            <div style={{width: '400px', margin: 'auto', marginTop: '60px'}}>
              <MDBInput
                label='Item Name'
                id='name'
                onChange={handleChangeName}
              />
              <MDBInput
                label='Amount'
                id='amount'
                onChange={handleChangeAmount}
              />
            </div>

            <div>
              <MDBBtn color='pink' onClick={handleSubmit}>
                Add Item
              </MDBBtn>
            </div>
          </form>

            <div className="my-12 mx-12" style={{marginTop:"30px"}}>
              {fetchedItems &&
                fetchedItems.map((item) => (
                  <Items
                    key={item.id}
                    item={item}
                    id={id}
                    handleClick={handleDeleteItem}
                    handleEdit={handleEditItem}
                    editButton={editItemIsOpen}
                    handleEditIcon={handleEditIsOpen}
                  />
                ))}
            </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to='/login' />;
  }
};
const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  const id = ownProps.match.params.id;
  const lists = state.firestore.data.lists;
  const list = lists ? lists[id] : null;
  // console.log(lists, id);
  const items = state.firestore.data.lists
    ? state.firestore.data.lists[id].items
    : null;
  // console.log(items);
  return {
    list: list,
    items: items,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (list) => dispatch(addItem(list)),
    deleteItem: (item) => dispatch(deleteItem(item)),
    editItem: (item) => dispatch(editItem(item)),
  };
};
export default compose(
  firestoreConnect(() => ['lists']),
  connect(mapStateToProps, mapDispatchToProps)
)(List);

// <form onSubmit={handleSubmit}>
//             <h5>Add item</h5>
//             <div>
//               <label htmlFor='name'>Name</label>
//               <input type='text' id='name' onChange={handleChangeName} />
//             </div>
//             <div>
//               <label htmlFor='number'>Amount</label>
//               <input type='number' id='amount' onChange={handleChangeAmount} />
//             </div>

//             <div>
//               <button>Add item</button>
//             </div>
//           </form>
