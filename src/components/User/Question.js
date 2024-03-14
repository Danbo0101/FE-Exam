import _ from "lodash";

const Question = (props) => {
    const { data, index } = props;


    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckBox = (event, ansId, quesId) => {
        // console.log("a", ansId, "q", quesId);
        props.handleCheckBox(ansId, quesId);
    }


    return (
        <>
            {data.image ? <div className="image-question">
                <img src={`data:image/jpeg;base64,${data.image}`} />
            </div>
                :
                <></>}

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
                                        onChange={(event) => handleCheckBox(event, ans.id, data.questionId)}
                                    />
                                    <label className="form-check-label" >
                                        {ans.description}
                                    </label>
                                </div>

                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default Question;