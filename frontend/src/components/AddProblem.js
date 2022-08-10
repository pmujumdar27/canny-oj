import React, { useState } from 'react';

const AddProblem = () => {
    const [problem, setProblem] = useState({
        title: "",
        statement: "",
        author: {},
        sample_input: "",
        sample_output: "",
        test_input: "",
        test_output: ""
    })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Submit</p>
                <label htmlFor="language">Language</label>
                <select id="cars" name="cars" onChange={(e) => setLanguage(e.target.value)}>
                    <option value="Cpp">C++</option>
                    <option value="python">Python</option>
                </select>
                <input type="file" onChange={handleChange}/>
                <Button variant="primary" type="submit">Upload</Button>
            </form>
        </div>
    )
}

export default AddProblem