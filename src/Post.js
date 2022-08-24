import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Post() {
    const [name, setName] = useState('');

    const handleChange = (event) => {
        setName({ name: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // const user = {
        //     name: name,
        //     username: 'a',

        // };

        // axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     })
        


    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Person Name:
                    <input type="text" name="name" onChange={handleChange} />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default Post
