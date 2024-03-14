import { useRef } from "react";
import "../DetailQuiz.scss"
import CountDown from "./CountDown";

const RightContent = (props) => {

    const { dataQuiz } = props;

    const refDiv = useRef([]);

    const toTimeUp = () => {
        props.handleSubmit();
    }

    const getClassQuestion = (question, index) => {
        console.log(question.answers.length)
        if (question && question.answers.length > 0) {

            let isAnswered = question.answers.find(item => item.isSelected === true);
            // console.log(isAnswered);
            if (isAnswered) {
                return "question selected";
            }
        }
        return "question";
    }

    const handleClickQuestion = (question, index) => {
        props.setIndex(index);
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question";
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(item => item.isSelected === true);
            // console.log(isAnswered);
            if (isAnswered) {

                return;
            }
        }
        refDiv.current[index].className = "question clicked";

    }



    return (
        <>
            <div className="main-timer">
                <CountDown
                    toTimeUp={toTimeUp}
                />
            </div>
            <div className="main-questions">
                {dataQuiz
                    && dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`Question ${index + 1}`}
                                className={getClassQuestion(item, index)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={el => refDiv.current[index] = el}
                            >
                                {index + 1}
                            </div>
                        )
                    })}


            </div>
        </>
    )
}

export default RightContent;