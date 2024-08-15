import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { FcPlus } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import './ChangeProfile.scss';
import { postUpdateProfile } from '../../../services/authService';
import { toast } from 'react-toastify';


const ChangeProfile = (props) => {

    const account = useSelector(state => state?.user?.account)
    // console.log(account);

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(account)) {
            setEmail(account.email);
            setUserName(account.username);
            setRole(account.role);
            setImage("");
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`);
            }
        }
    }, [account]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleUpdateProfile = async () => {

        let data = await postUpdateProfile(userName, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            props.handleClose();
        }
        else {
            toast.error(data.EM);
        }


        // console.log(data);
    }




    return (
        <div className="change-profile-container">
            <form className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <input
                        type="text"
                        className="form-control"
                        value={role}
                        disabled
                    />
                </div>
                <div className='col-md-12'>

                    <label className='"form-label label-upload' htmlFor='labelUpload'>
                        <FcPlus />
                        Upload File Image
                    </label>
                    <input
                        type='file'
                        id='labelUpload'
                        hidden
                        onChange={(event) => handleUploadImage(event)}
                    />
                </div>
                <div className='col-md-12 img-preview'>
                    {previewImage ?
                        <img src={previewImage} />
                        :
                        <span>Preview Image</span>
                    }
                    {/* <span>Preview Image</span> */}

                </div>
            </form>
            <div className='btn'>
                <Button variant="primary"
                    onClick={handleUpdateProfile}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default ChangeProfile;