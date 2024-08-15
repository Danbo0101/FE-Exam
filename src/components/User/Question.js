import _ from "lodash";
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from 'react-i18next';
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const Question = (props) => {
    const { data, index, isShowAnswer } = props;

    const [isPreviewImage, setIsPreviewImage] = useState(false);


    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckBox = (event, ansId, quesId) => {
        // console.log("a", ansId, "q", quesId);
        props.handleCheckBox(ansId, quesId);
    }


    return (
        <>
            {data.image ?
                <div className="image-question">
                    <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64,${data.image}`}
                    />

                    {isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            title={"Question Image"}
                            onClose={() => setIsPreviewImage(false)}
                        >
                        </Lightbox>
                    }
                </div>

                :
                <div className='image-question'>

                </div>}

            <div className="question-content">
                <div className="question">
                    Question {index + 1} : {data.questionDescription}
                </div>
                {/* <div className="answers">{data.answers.description}</div> */}
                <div className="answers">
                    {data.answers &&
                        data.answers.map((ans, index) => {
                            return (
                                <div key={`q-${index}`} className="form-check a-child">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={ans.isSelected}
                                        disabled={props.isSubmitQuiz}
                                        onChange={(event) => handleCheckBox(event, ans.id, data.questionId)}
                                    />
                                    <label className="form-check-label" >
                                        {ans.description}
                                    </label>
                                    {isShowAnswer === true &&
                                        <>
                                            {ans.isSelected === true && ans.isCorrect === false
                                                && <IoIosClose className='incorrect' />
                                            }

                                            {ans.isCorrect === true
                                                && <IoIosCheckmark className='correct' />
                                            }
                                        </>
                                    }
                                </div>

                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default Question;