import Button from 'react-bootstrap/Button';
import './ChangePassword.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postChangePassword } from '../../../services/authService';

const ChangePassword = (props) => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        props.handleClose();
    }

    const handleChangePassword = async () => {
        if (!currentPassword) {
            toast.warning('Invalid Current Password')
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.warning('Confirm Password Wrong')
            return;
        }

        let data = await postChangePassword(currentPassword, newPassword);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleReset();
        }
        else {
            toast.error(data.EM);
        }


    }


    return (
        <div className="change-password-container">
            <form className="row g-3 form">
                <div className="col-md-7">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                </div>
                <div className="col-md-7">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                </div>
                <div className="col-md-7">
                    <label className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
            </form>
            <div className='btn'>
                <Button variant="primary"
                    onClick={handleChangePassword}
                >
                    Change Password
                </Button>
            </div>
        </div>
    )
}

export default ChangePassword;