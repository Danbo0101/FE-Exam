
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../services/quizServices';

const DeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        console.log(dataDelete.id);
        let data = await deleteQuiz(dataDelete.id);
        // console.log("check res ", data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.fetchListQuiz();
            // props.setCurrentPage(1);
            // await props.fetchListUsersWithPaginate(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the Quiz ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure Delete Quiz.
                    <br />
                    Name = <b>
                        {dataDelete && dataDelete.name ? dataDelete.name : ""}
                    </b>
                    <br />
                    Description = <b>
                        {dataDelete && dataDelete.description ? dataDelete.description : ""}
                    </b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDeleteUser() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default DeleteQuiz;