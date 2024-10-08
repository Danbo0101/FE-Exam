import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/quizServices";
import _ from 'lodash';
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from './Modal/ModalResult'
import SubmitQuiz from "./Modal/ModalSubmitQuiz";
import RightContent from "./Content/RightContent";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';



const DetailQuiz = (props) => {

    const { t } = useTranslation();
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({})

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
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
                        item.answers.isCorrect = false;
                        answers.push(item.answers);
                    })
                    answers = _.orderBy(answers, ['id'], ['asc']);

                    return {
                        questionId: key,
                        answers,
                        questionDescription,
                        image
                    }
                })
                .value();
            setDataQuiz(data)
        }
    }


    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz); //react hook doesn't merge state
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })

            payload.answers = answers;

            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setIsSubmitQuiz(true);
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true);
                if (res.DT && res.DT.quizData) {
                    let dataQuizClone = _.cloneDeep(dataQuiz);
                    let a = res.DT.quizData;
                    for (let q of a) {
                        for (let i = 0; i < dataQuizClone.length; i++) {
                            if (+q.questionId === +dataQuizClone[i].questionId) {
                                let newAnswers = [];
                                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                    let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                                    if (s) {
                                        dataQuizClone[i].answers[j].isCorrect = true;
                                    }
                                    newAnswers.push(dataQuizClone[i].answers[j]);
                                }
                                dataQuizClone[i].answers = newAnswers;
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }
            } else {
                alert('somthing wrongs....')
            }
        }
    }

    const handleShowAnswer = () => {
        if (!isSubmitQuiz) return;
        setIsShowAnswer(true);
    }

    // console.log(" check", dataQuiz.questionId);

    return (
        <>
            <Breadcrumb className="quiz-detai-new-header">
                <NavLink to='/' className='breadcrumb-item'>
                    Home
                </NavLink>
                <NavLink to='/users' className='breadcrumb-item'>
                    User
                </NavLink>
                <Breadcrumb.Item active>
                    Quiz
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="detail-quiz-container container">
                <div className="left-container">
                    <div className="title">
                        Quiz {quizId} : {location?.state?.quizDescription}
                    </div>
                    <hr />

                    <Question
                        index={index}
                        handleCheckBox={handleCheckBox}
                        isShowAnswer={isShowAnswer}
                        isSubmitQuiz={isSubmitQuiz}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ?
                                dataQuiz[index]
                                : []
                        } />

                    <div className="footer">
                        <button className="btn btn-secondary"
                            onClick={() => handlePrev()}
                        >Prev</button>
                        <button
                            onClick={() => handleNext()}
                            className="btn btn-primary">Next</button>

                        <button
                            disabled={isSubmitQuiz}
                            onClick={() => handleFinishQuiz()}
                            className="btn btn-warning">Finish</button>
                    </div>
                </div>
                <div className="right-container">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        setIndex={setIndex}
                        isSubmitQuiz={isSubmitQuiz}
                    />
                </div>
                <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModalResult={dataModalResult}
                    handleShowAnswer={handleShowAnswer}
                />
            </div>
        </>
    )
}

export default DetailQuiz;