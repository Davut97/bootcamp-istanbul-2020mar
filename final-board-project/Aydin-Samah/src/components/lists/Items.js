import React, {useState} from 'react';
import {
  MDBIcon,
  MDBContainer,
  MDBInput,
  MDBListGroupItem,
  MDBListGroup,
  MDBBadge,
} from 'mdbreact';

const Items = (props) => {
  // console.log(props)
  const [itemNameBeforeEdit, setItemNameBeforeEdit] = useState(props.item.name);
  const [itemAmountBeforeEdit, setItemAmountBeforeEdit] = useState(
    props.item.amount
  );
  const [itemNameAfterEdit, setItemNameAfterEdit] = useState(props.item.name);
  const [itemAmountAfterEdit, setItemAmountAfterEdit] = useState(
    props.item.amount
  );

  const [itemIsSelected, setItemIsSelected] = useState(false);
  const handleEditButton = () => {
    props.handleClick(
      props.id,
      props.item.id,
      itemNameBeforeEdit,
      itemAmountBeforeEdit
    );
    props.handleEdit(
      props.id,
      props.item.id,
      itemNameAfterEdit,
      itemAmountAfterEdit
    );
    setItemIsSelected(!itemIsSelected);
  };
  // console.log(props);
  if (itemIsSelected === true) {
    return (
      <div style={{width: '400px', margin: 'auto', marginTop: '0'}}>
        <MDBContainer>
          <MDBListGroup className='my-4 mx-4' style={{width: '22rem'}}>
            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
              <MDBInput
                label='Item Name'
                value={itemNameAfterEdit}
                onChange={(event) => setItemNameAfterEdit(event.target.value)}
              />

              <MDBInput
                label='Amount'
                value={itemAmountAfterEdit}
                onChange={(event) => setItemAmountAfterEdit(event.target.value)}
              />
              <MDBIcon icon='check' onClick={handleEditButton} />
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBContainer>
      </div>
    );
  } else {
    return (
      <div style={{width: '400px', margin: 'auto', marginTop: '0'}}>
        <MDBContainer>
          <MDBListGroup className='my-4 mx-4' style={{width: '22rem'}}>
            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
              {itemNameBeforeEdit}
              <MDBIcon
                icon='trash-alt'
                onClick={() => {
                  props.handleClick(
                    props.id,
                    props.item.id,
                    itemNameBeforeEdit,
                    itemAmountBeforeEdit
                  );
                }}
              />
              <MDBIcon
                icon='edit'
                onClick={() => setItemIsSelected(!itemIsSelected)}
              />
              <MDBBadge color='primary' pill>
                {itemAmountBeforeEdit}
              </MDBBadge>
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBContainer>
      </div>
    );
  }
};

export default Items;

// <div>
// <MDBInput label="Item Name" id='name' onChange={(event) => setItemName(event.target.value)}  id='name' value={itemName} placeholder={itemName}/>
// </div>
// <div>
// <MDBInput label="Amount" id='amount' onChange={(event) => setItemAmount(event.target.value)}  id='amount' value={itemAmount} placeholder={itemAmount}/>
// </div>

// <div>
//       <form>
//         <div>
//           <label htmlFor='name'>Item: </label>
//           <input
//             type='text'
//             id='name'
//             value={itemName}
//             onChange={(event) => setItemName(event.target.value)}
//             placeholder={itemName}
//           />
//         </div>
//         <div>
//           <label htmlFor='number'>Amount</label>
//           <input
//             type='number'
//             id='amount'
//             value={itemAmount}
//             onChange={(event) => setItemAmount(event.target.value)}
//             placeholder={itemAmount}
//           />
//         </div>
//         <button
//           type='button'
//           onClick={() => {
//             props.handleClick(props.id, props.item.id, itemName, itemAmount);
//           }}>
//           DELETE ITEM
//         </button>
//         <button
//           type='button'
//           onClick={() =>
//             props.handleEdit(props.id, props.item.id, itemName, itemAmount)
//           }>
//
//         </button>
//       </form>
//     </div>
