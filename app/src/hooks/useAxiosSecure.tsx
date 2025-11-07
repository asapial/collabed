import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



const AxiosInstance=axios.create({
    baseURL:'https://collab-ed-server.vercel.app'
})
const useAxiosSecure = () => {

    const {user,loading}=useContext(AuthContext);

    
    AxiosInstance.interceptors.request.use(config=>{
    if (user && user.accessToken && !loading) {
      config.headers.authorization = `Bearer ${user.accessToken}`;
    }
        return config;
    })

    return AxiosInstance;
};

export default useAxiosSecure;