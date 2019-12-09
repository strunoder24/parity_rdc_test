import axios from 'axios';

axios.defaults.withCredentials = true;   /*Позволяет получать куки*/

axios.defaults.headers = {
    'Accept': 'application/json',
};

if (process.env.NODE_ENV === 'production') axios.defaults.baseURL = '/api/v1/';
else if (process.env.NODE_ENV === 'development') axios.defaults.baseURL = 'http://localhost:8000/api/v1/';


