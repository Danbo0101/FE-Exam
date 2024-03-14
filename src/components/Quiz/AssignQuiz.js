import { useState, useEffect } from "react";
import Select from 'react-select';
import { getAllQuizForAdmin, postAssignQuiz } from "../../services/quizServices";
import { getAllUser } from "../../services/adminServices";
import { toast } from 'react-toastify';
import "./AssignQuiz.scss"



const AssignQuiz = (props) => {


    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});


    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});


    useEffect(() => {
        fetchListQuiz();
        fetchListUser();
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                }
            })

            setListQuiz(newQuiz);
        }

    }
    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let newUsers = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                }
            })

            setListUser(newUsers);
        }

    }

    const handelAssignQuizForUser = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);

        }
        else {
            toast.error(res.EM);
        }

    }
    return (
        <div className="assign-container row">
            <div className="col-6">
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    placeholder={"Quiz type ..."}
                />
            </div>
            <div className="col-6">
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    placeholder={"Quiz type ..."}
                />
            </div>

            <div>
                <button
                    className="btn btn-warning btn-submit"
                    onClick={() => handelAssignQuizForUser()}
                >
                    Save Question
                </button>
            </div>




        </div>
    )
}

export default AssignQuiz;