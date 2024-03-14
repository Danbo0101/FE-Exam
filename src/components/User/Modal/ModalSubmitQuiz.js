
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const SubmitQuiz = (props) => {
    const { show, setShow, dataSubmit } = props;

    const handleClose = () => setShow(false);

    // console.log("check dataSubmit", dataSubmit);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    Quiz Number =  <b>
                        {dataSubmit.countTotal}
                    </b>
                    <br />
                    Correct Answers =  <b>
                        {dataSubmit.countCorrect}
                    </b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default SubmitQuiz;