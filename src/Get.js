import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Get() {
    const [post, setPost] = useState([]);
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((res) => {
                const postData = res.data;
                setPost(postData);
            })
    }, [])
    // console.log(post)
    return (
        <div>
                {
                    post.map((current, index) => {
                        return (
                            <div key={index}>
                                <ul>
                                    <li>Name: {current.name}</li>
                                    <li>Username: {current.username}</li>
                                    <li>Email: {current.email}</li>
                                    <li>Phone: {current.phone}</li>
                                </ul>
                            </div>
                        ) 
                    })
                }


        </div>
    )
}

export default Get
