import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {addItem} from '../actions/itemAction';


function ItemModal() {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const toggle = () => {
        setModal(!modal);
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
       const nameObj = {
            name:name
       }

    dispatch(addItem(nameObj));
setModal(!modal);
    }

    const handleChange = (e) =>{
        setName(e.target.value)
    }

    return (
        <div>
            <Button color="dark" style={{margin:"2rem"}} onClick={()=>toggle()}>Add Item</Button>
            <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleOnSubmit}>
                <FormGroup>
                    <Label for="item">Item</Label>
                    <Input type="text" name="name" id="item" placeholder="Add shopping Item" onChange={handleChange}/> 
                    <Button color="dark" style={{marginTop:"2rem"}} block>Add Item</Button> 
                </FormGroup>
                </Form>
            </ModalBody>
            </Modal>
        </div>
    )
}

export default ItemModal

