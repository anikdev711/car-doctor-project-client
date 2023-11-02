import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";


const axiosSecure = axios.create({
    baseURL: 'https://car-doctor-project-server-v2.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {

    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('Error tracked in the interceptors', error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('logout the user');
                logOut()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(error => console.log(error))

            }
        })
    }, [logOut, navigate])


    return axiosSecure;
};

export default useAxiosSecure;