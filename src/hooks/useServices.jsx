import axios from "axios";
import { useEffect, useState } from "react";


const useServices = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        axios.get('https://car-doctor-project-server-v2.vercel.app/services')
            .then(res => {
                console.log(res.data);
                setServices(res.data);
            })
    }, [])

    return services;


};

export default useServices;