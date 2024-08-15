import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ChangeProfile from './Content/ChangeProfile';
import ChangePassword from './Content/ChangePassword';
import History from './Content/History';


const Profile = (props) => {

    const { show } = props;

    const handleClose = () => {
        props.setShow(false)
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        className="mb-3"
                    >
                        <Tab eventKey="profile" title="Change Profile">
                            <ChangeProfile
                                handleClose={handleClose}
                            />
                        </Tab>
                        <Tab eventKey="password" title="Change Password">
                            <ChangePassword
                                handleClose={handleClose}
                            />
                        </Tab>
                        <Tab eventKey="history" title="History" >
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Profile;