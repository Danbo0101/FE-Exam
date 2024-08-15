import "./QuizQA.scss";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { BsPlusCircleDotted, BsDashCircleDotted } from "react-icons/bs";
import { AiFillPlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, getQuizForQA, postUpSertQA } from "../../services/quizServices";
import { postCreateNewQuestionForQuiz } from "../../services/questionServices";
import { postCreateNewAnswerForQuestion } from "../../services/answerServices";
import { toast } from 'react-toastify';


const QuizQA = () => {

    const innitQuestion = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            isValidQuestion: true,
            answers: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                    isValidAnswer: true,
                }
            ]
        }
    ];

    // const [isValidQuestion, setIsValidQuestion] = useState(false);

    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [previewImage, setPreviewImage] = useState(false);

    const [dataPreviewImage, setDatePreviewImage] = useState(
        {
            url: "",
            title: ""
        }
    )

    const [listQuiz, setListQuiz] = useState([]);

    const [questions, setQuestions] = useState(innitQuestion);

    useEffect(() => {
        fetchListQuiz()
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz])

    const urltoFile = (url, filename, mimeType) => {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizForQA(selectedQuiz.value)
        if (res && res.EC === 0) {
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                let newA = []
                for (let j = 0; j < q.answers.length; j++) {
                    let a = q.answers[j];
                    a.isValidAnswer = true;
                    newA.push(a);

                }
                if (q.imageFile) {
                    q.imageName = `Question - ${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question - ${q.id}.png`, 'image/png')

                }
                q.isValidQuestion = true;
                q.answers = newA;
                newQA.push(q);
            }
            // console.log(newQA);
            setQuestions(newQA);
        }
        else {
            toast.error(res.EM)
        }
    }

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`,
                }
            })

            setListQuiz(newQuiz);
        }

    }

    const handleClickQuestion = () => {
        const updatedValidQuestions = questions.map((question) => {
            return { ...question, isValidQuestion: true };
        });
        setQuestions(updatedValidQuestions);
    }
    const handelClickAnswer = () => {
        const updatedValidQuestions = questions.map((question) => {
            const updateValidAnswer = question.answers.map((answer) => {
                return { ...answer, isValidAnswer: true }

            })

            return { ...question, answers: updateValidAnswer };
        });
        setQuestions(updatedValidQuestions);
    }


    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            let newQuestion = {
                id: uuidv4(),
                description: "",
                imageFile: "",
                imageName: "",
                isValidQuestion: true,
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isCorrect: false,
                        isValidAnswer: true,
                    }
                ]
            };

            setQuestions([...questions, newQuestion])

        }
        if (type === "REMOVE") {

            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);

        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === "ADD") {
            let newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false,
                isValidAnswer: true,
            }

            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === "REMOVE") {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }


    }

    const handleOnChange = (type, questionId, value) => {
        // console.log(type, questionId, value);
        if (type === "QUESTION") {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
            }
            setQuestions(questionsClone);
        }
    }

    const handleUploadFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === "CHECKBOX") {
                        answer.isCorrect = value;
                    }
                    if (type === "INPUT") {
                        answer.description = value;
                    }
                }
                return answer;
            })
            setQuestions(questionsClone);
        }
    }

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDatePreviewImage(
                {
                    url: URL.createObjectURL(questionClone[index].imageFile),
                    title: questionClone[index].imageName
                }
            )
            setPreviewImage(true);
        }
    }

    const isValid = (type, questionId, answerId) => {

        if (type === "QUESTION") {

            const updatedValidQuestions = questions.map((question, index) => {
                if (index === questionId) {
                    return { ...question, isValidQuestion: false };
                }
                return question;
            });

            setQuestions(updatedValidQuestions);
        }

        if (type === "ANSWER") {
            const updatedValidQ = questions.map((question, indexQ) => {
                if (indexQ === questionId) {
                    const updateValidAnswer = question.answers.map((answer, indexA) => {
                        if (indexA === answerId) {
                            return { ...answer, isValidAnswer: false };
                        }
                        return answer;
                    })
                    return { ...question, answers: updateValidAnswer }
                }
                return question;
            })
            // console.log(updatedValidQ);

            setQuestions(updatedValidQ);
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handleSubmitQuestion = async () => {
        // console.log("check question", questions, selectedQuiz);

        //validate

        //validate quiz 
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Not empty Quiz");
            return;
        }

        //validate question

        let isValidQ = true;
        let indexQ;


        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                indexQ = i;
                isValidQ = false;

                break;
            }
        }

        if (isValidQ === false) {

            isValid("QUESTION", indexQ,);
            toast.error(`Not Empty Question ${indexQ + 1}`);
            return;

        }


        //validate answer

        let isValidA = true;
        let indexQ1, indexA;
        let countA;
        let isCorrect = true;

        for (let i = 0; i < questions.length; i++) {
            let countIsCorrect = 0;
            countA = questions[i].answers.length;
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    indexA = j;
                    isValidA = false;
                    break;
                }
                if (questions[i].answers[j].isCorrect) {
                    countIsCorrect += 1;
                }

            }

            indexQ1 = i;
            if (isValidA === false) break;
            if (countIsCorrect !== 1) {
                isCorrect = false;
            }
        }

        if (countA < 2) {
            toast.error(`Need at least two answer in Question ${indexQ1 + 1}`)
            return;

        }
        if (isValidA === false) {
            isValid("ANSWER", indexQ1, indexA);
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ1 + 1}`);
            return;
        }



        if (isCorrect === false) {

            toast.error(`Need at least one correct answer in Question ${indexQ1 + 1}`)
            return;
        }


        //submit question
        let questionsClone = _.cloneDeep(questions);
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile);
            }
        }

        let res = await postUpSertQA(
            {
                quizId: selectedQuiz.value,
                questions: questionsClone
            }
        )

        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        }

    }



    return (
        <div className="question-container">
            <div className="selected-quiz">
                Selected Quiz :
                <div className="col-6 form-group mt-2">
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        placeholder={"Quiz type ..."}
                    />
                </div>
            </div>
            <div className="add-question ">
                Add questions:
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className="question-main mb-3">
                                <div className="question-content">
                                    <div className="form-floating description ">
                                        <input
                                            type="text"
                                            className={`form-control ${question.isValidQuestion ? "" : "is-invalid"}`}
                                            value={question.description}
                                            onClick={() => handleClickQuestion()}
                                            onChange={(event) => handleOnChange("QUESTION", question.id, event.target.value)}
                                        />
                                        <label>Question {index + 1} 's Description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddLine className="label-upload" />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleUploadFileQuestion(question.id, event)}
                                            type="file"
                                            hidden
                                        />
                                        <span>
                                            {
                                                question.imageName
                                                    ? <span
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handlePreviewImage(question.id)}
                                                    >
                                                        {question.imageName}
                                                    </span>
                                                    : "0 file is the upload"
                                            }
                                        </span>
                                    </div>
                                    <div className="btn-question-action">
                                        <span
                                            onClick={() => handleAddRemoveQuestion("ADD", "")}
                                        >
                                            <BsPlusCircleDotted className="btn-add" />
                                        </span>
                                        {
                                            questions.length > 1 &&
                                            <span
                                                onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}
                                            >
                                                <BsDashCircleDotted className="btn-remove" />
                                            </span>
                                        }

                                    </div>

                                </div>

                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answers-content">
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onClick={(event) => handleAnswerQuestion("CHECKBOX", question.id, answer.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${answer.isValidAnswer ? "" : "is-invalid"}`}
                                                        value={answer.description}
                                                        onClick={() => handelClickAnswer()}
                                                        onChange={(event) => handleAnswerQuestion("INPUT", question.id, answer.id, event.target.value)}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className="btn-answers-action">
                                                    <span onClick={() => handleAddRemoveAnswer("ADD", question.id, "")}>
                                                        <AiFillPlusSquare className="btn-add" />
                                                    </span>
                                                    {
                                                        question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}>
                                                            <AiOutlineMinusSquare className="btn-remove" />
                                                        </span>
                                                    }

                                                </div>


                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0
                    &&
                    <div>
                        <button
                            className="btn btn-warning btn-submit"
                            onClick={() => handleSubmitQuestion()}
                        >
                            Save Question
                        </button>
                    </div>
                }
                {
                    previewImage &&
                    <Lightbox
                        image={dataPreviewImage.url}
                        title={dataPreviewImage.title}
                        onClose={() => setPreviewImage(false)}
                    ></Lightbox>
                }

            </div>

        </div>
    )
}

export default QuizQA;