import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [homeData, setHomeData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000")
            .then(res => {
                console.log("Hello: ", res.data);
                setHomeData(res.data);
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }, []);
    return (
        <div>
            <h2>Home</h2>
            {homeData.message}
        </div>
    )
}

export default Home;