import UpdateQuiz from "./Modal/ModalUpdateQuiz";
import DeleteQuiz from "./Modal/ModalDeleteUser";

import { useState } from "react";

const TableQuiz = (props) => {

    const { listQuiz, fetchListQuiz } = props;

    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataDelete, setDataDelete] = useState({});


    const handleClickBtnUpdateQuiz = (user) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(user);
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    const handleClichBtnDeleteQuiz = (user) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(user);
    }

    return (
        <>
            <div className="table-title">
                List Quiz :
            </div>
            <table className="table table-hover table-light table-bordered my-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>

                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleClickBtnUpdateQuiz(item)}
                                    >Edit</button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleClichBtnDeleteQuiz(item)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <UpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
                fetchListQuiz={fetchListQuiz}

            />

            <DeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
            />
        </>
    )
}

export default TableQuiz;