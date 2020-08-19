import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getItems, deleteItem } from './../actions/itemAction';


function ShoppingList() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items)

    const useFetching = (getItems) => {
        useEffect(() => {
            dispatch(getItems());
        })
    }

    useFetching(getItems);

    const deleteIt = (id) => {
        dispatch(deleteItem(id));
    }
    
    return (
        <Container>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items.map(({ _id, name }) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button 
                                className="remove-btn" 
                                color="danger"
                                size="sm"
                                onClick={()=>{deleteIt(_id)}}>
                                &times;
                                </Button>
                                {name}
                            </ListGroupItem>

                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    )
}

export default ShoppingList