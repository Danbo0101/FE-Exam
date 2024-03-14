import axios from "../utils/axiosCustomize"

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}

export {
    postCreateNewAnswerForQuestion
}