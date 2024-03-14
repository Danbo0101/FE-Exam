import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/quizServices";
import _ from 'lodash';
import "./DetailQuiz.scss";
import Question from "./Question";
import SubmitQuiz from "./Modal/ModalSubmitQuiz";
import RightContent from "./Content/RightContent";



const DetailQuiz = (props) => {

    const param = useParams();
    const quizId = param.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [showModalSubmitQuiz, setShowModalSubmitQuiz] = useState(false);
    const [dataSubmit, setDataSubmit] = useState({})


    useEffect(() => {
        fetchListQuestion();

    }
        , [quizId])


    const fetchListQuestion = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;

                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            // console.log(data)
            setDataQuiz(data);
        }
    }

    const handlePre = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);

    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                // console.log(item);
                return item;
            })
            // console.log(qClone);
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        // console.log("index", index);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleSubmit = async () => {
        // console.log("check data", dataQuiz);
        const payload = {
            quizId: +quizId,
            answers: []
        }

        let answers = [];

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(ques => {
                let questionId = +ques.questionId;
                let userAnswerId = []

                ques.answers.forEach(ans => {
                    if (ans.isSelected) {
                        userAnswerId.push(ans.id);
                    }
                })

                answers.push({
                    questionId,
                    userAnswerId
                })
            })
        }
        payload.answers = answers;
        console.log('check payload', payload);

        let res = await postSubmitQuiz(payload);
        if (res && res.EC === 0) {
            setShowModalSubmitQuiz(true);
            setDataSubmit(res.DT);
        }

    }

    // console.log(" check", dataQuiz.questionId);
    return (
        <div className="detail-quiz-container container">
            <div className="left-container">
                <div className="title">
                    Quiz {quizId} : {location?.state?.quizDescription}
                </div>
                <hr />
                <Question
                    handleCheckBox={handleCheckBox}
                    data={
                        dataQuiz && dataQuiz.length > 0 ?
                            dataQuiz[index]
                            :
                            []
                    }
                    index={index}
                />
                <div className="footer">
                    <button
                        onClick={() => handlePre()}
                        className="btn btn-secondary"
                    >Pre</button>
                    <button
                        onClick={() => handleNext()}
                        className="btn btn-primary"
                    >Next</button>
                    <button
                        onClick={() => handleSubmit()}
                        className="btn btn-warning"
                    >Submit</button>
                </div>
            </div>

            <div className="right-container">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleSubmit={handleSubmit}
                    setIndex={setIndex}
                />
            </div>
            <SubmitQuiz
                show={showModalSubmitQuiz}
                setShow={setShowModalSubmitQuiz}
                dataSubmit={dataSubmit}
            />
        </div>
    )
}

export default DetailQuiz;