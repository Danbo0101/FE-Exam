
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../../services/adminServices';
import { toast } from 'react-toastify';

const DeleteUser = (props) => {
    const { show, setShow, dataDeleteUser } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDeleteUser.id);
        // console.log("check res ", data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(1);
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
                    <Modal.Title>Confirm Delete the User ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure Delete the user.
                    <br />
                    Email = <b>
                        {dataDeleteUser && dataDeleteUser.email ? dataDeleteUser.email : ""}
                    </b>
                    <br />
                    User Name = <b>
                        {dataDeleteUser && dataDeleteUser.username ? dataDeleteUser.username : ""}
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

export default DeleteUser;