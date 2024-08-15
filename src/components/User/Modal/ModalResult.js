import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


const ModalResult = (props) => {

    const navigate = useNavigate();

    const { show, setShow, dataModalResult } = props;
    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Quiz Number : <b>{dataModalResult.countTotal} </b></div>
                    <div>Correct Answers : <b>{dataModalResult.countCorrect} </b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        props.handleShowAnswer();
                    }}>
                        Show answer
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/users')}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;