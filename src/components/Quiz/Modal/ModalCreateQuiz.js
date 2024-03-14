import { FcPlus } from "react-icons/fc";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useState } from "react";
import '../ManageQuiz.scss'
import { postCreateNewQuiz } from "../../../services/quizServices";

const CreateQuiz = (props) => {

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
            console.log("state image create", image);
        }
    }

    const handleSubmitNewQuiz = async () => {
        console.log("2");
        if (!name) {
            toast.error("Name is required");
            return;
        } else if (!description) {
            toast.error("Description is required");
            return;
        } else if (!difficulty.value) {
            toast.error("Difficulty is required");
            return;
        }

        let res = await postCreateNewQuiz(description, name, difficulty?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setDifficulty("");
            setImage("");
            setPreviewImage("");
            props.fetchListQuiz();
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="add-new">
            <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name Quiz"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label>Name</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description Quiz"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <label>Description</label>
                </div>

                <div className="form-floating my-3">
                    <Select
                        defaultValue={difficulty}
                        onChange={setDifficulty}
                        options={options}
                        placeholder={"Quiz type ..."}
                    />
                </div>
                <div className="more-actions form-group">
                    <label className='"form-label label-upload' htmlFor='labelUploadCreate'>
                        <FcPlus />
                        Upload File Image
                    </label>
                    <input
                        type='file'
                        id='labelUploadCreate'
                        hidden
                        onChange={(event) => handleUploadImage(event)}
                    />

                </div>
                <div className='col-md-12 img-preview mt-2'>
                    {previewImage ?
                        <img src={previewImage} />
                        :
                        <span>Preview Image</span>
                    }
                    {/* <span>Preview Image</span> */}

                </div>
                <div className="d-flex justify-content-center">
                    <div
                        onClick={() => handleSubmitNewQuiz()}
                        className="btn btn-warning mt-3 ms-auto me-auto">
                        Save
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

export default CreateQuiz;
