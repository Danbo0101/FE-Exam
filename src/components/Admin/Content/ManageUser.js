
import CreateUser from "./Modal/ModalCreateUser";
import { FcPlus } from "react-icons/fc";
// import TableUser from "../TableUser";
import { useEffect, useState } from "react";
import { getUserWithPaginate } from "../../../services/adminServices";
import UpdateUser from "./Modal/ModalUpdateUser";
import DeleteUser from "./Modal/ModalDeleteUser";
import TableUserWithPaginate from "../TableUserWithPaginate";
import ViewUser from "./Modal/ModalViewUser";

const ManageUser = (props) => {

    const LIMIT_USER = 5;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)


    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDeleteUser, setDataDeleteUser] = useState('');

    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataViewUser, setDataViewUser] = useState({});

    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, [])

    // const fetchListUsers = async () => {
    //     let res = await getAllUser();
    //     if (res.EC === 0) {
    //         setListUsers(res.DT);
    //     }
    // }
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataViewUser(user);
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
        // console.log("update", user);
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDeleteUser(user);
    }

    return (
        <div className="manage-user-container">
            <div className="tilte">
                Manage User
            </div>
            <div className="user-content">
                <div className="btn-add-new-user">
                    <button className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}
                    >
                        <FcPlus /> Add new user
                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserWithPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        handleClickBtnView={handleClickBtnView}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <CreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataViewUser={dataViewUser}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setPageCount={setPageCount}

                />
                <UpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    resetDataUpdate={resetDataUpdate}
                    setPageCount={setPageCount}
                />
                <DeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDeleteUser={dataDeleteUser}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser;