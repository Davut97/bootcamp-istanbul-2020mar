import React from 'react';
import {MDBListGroupItem, MDBListGroup, MDBBadge} from 'mdbreact';
const CompletedItem = (props) => {
  // console.log(props);
  return (
    <div style={{width: '400px', margin: 'auto', marginTop: '0'}}>
      <MDBListGroup className='my-4 mx-4' style={{width: '22rem'}}>
        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
          {props.item.name}

          <MDBBadge color='primary' pill>
            {props.item.amount}
          </MDBBadge>
        </MDBListGroupItem>
      </MDBListGroup>
    </div>
  );
};
export default CompletedItem;
