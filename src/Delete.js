import React, { useState } from 'react';
import axios from 'axios';


function Delete() {
    const [number, setNumber] = useState();
    const handleChange = (event) => {
        setNumber({ id: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.delete(`https://jsonplaceholder.typicode.com/users/${number.id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Person ID:
                    <input type="number" name="id" onChange={handleChange} />
                </label>
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}

export default Delete
