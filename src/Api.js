import React, { useEffect } from 'react';
import axios from 'axios';

function Api() {
    async function getTodos() {

        let todos = await axios.get(
            "https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10"
        )
            .then(todos => {
                console.log(todos);
                console.log(todos.data);
                console.log(todos.status);
                console.log(todos.statusText);
                console.log(todos.headers);
                console.log(todos.config);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getTodos();
    

    // async function getTodos() {

    //     let body = {
    //         userId: 1111,
    //         title: "This is POST request with body",
    //         completed: true
    //     };

    //     axios
    //         .post("https://jsonplaceholder.typicode.com/todos", body)
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    // getTodos();




    return (
        <div>



        </div>
    )
}

export default Api
