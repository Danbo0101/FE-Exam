
import { useEffect, useState } from "react";
import './ManageQuiz.scss'
import TableQuiz from "./TableQuiz";
import Accordion from 'react-bootstrap/Accordion';
import { getAllQuizForAdmin } from "../../services/quizServices";
import CreateQuiz from "./Modal/ModalCreateQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";


const ManageQuiz = () => {

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchListQuiz()
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }

    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <CreateQuiz
                            fetchListQuiz={fetchListQuiz}
                        />
                        <div className="table-detail">
                            <TableQuiz
                                listQuiz={listQuiz}
                                fetchListQuiz={fetchListQuiz}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Edit Q/A</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign User</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>




        </div>
    )
}

export default ManageQuiz;