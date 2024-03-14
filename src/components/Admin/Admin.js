import SideBar from "./SideBar";
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import './Admin.scss';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { postLogout } from '../../services/authService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from "../Header/Language";





const Admin = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector(state => state.user.account);


    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = async () => {
        let res = await postLogout(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(doLogout());
            navigate('/login');
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)} >
                        <FaBars className="left-content" />
                    </span>
                    <div className="right-content">
                        <Language />

                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>


                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>
        </div>
    )
}

export default Admin;