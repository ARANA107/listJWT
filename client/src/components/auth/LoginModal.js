import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import {login} from  '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

function LoginModal() {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const error = useSelector(state => state.error)


    const dispatch = useDispatch();

    const toggle = useCallback(() =>{
        dispatch(clearErrors());
        setModal(!modal);
    },[modal, dispatch])
  

    useEffect(() => {
        // Check for register error
        if (error.id === 'LOGIN_FAIL') {
          setMsg(error.msg.msg);
        } else {
          setMsg(null);
        }
    
        // If authenticated, close modal
        if (modal) {
          if (isAuthenticated) {
            toggle();
          }
        }
      }, [error, toggle, isAuthenticated, modal]);



    const handleOnSubmit = (e) =>{
        e.preventDefault();

        //create a user
       const user = {
            email,
            password
       }
        //Attempt to create a user
        dispatch(login(user))
    }


      const handleChangeEmail = (e) => setEmail(e.target.value);
      const handleChangePassword = (e) => setPassword(e.target.value);

    return (
        <div>
            <NavLink onClick={toggle} href="#">Login</NavLink>            
            <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Login</ModalHeader>
            <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
                <Form onSubmit={handleOnSubmit}>
                <FormGroup> 
                    <Label for="email">Email</Label>
                    <Input className="mb-3" type="email" name="email" id="email" placeholder="Email" onChange={handleChangeEmail}/>

                    <Label for="password">Password</Label>
                    <Input className="mb-3" type="password" name="password" id="password" placeholder="Password" onChange={handleChangePassword}/>

                    <Button color="dark" style={{marginTop:"2rem"}} block>Login</Button> 
                </FormGroup>
                </Form>
            </ModalBody>
            </Modal>
        </div>
    )
}


export default LoginModal;

