import axios from 'axios';

 const setAuthToken = access_token => {
    if(access_token){
        axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.access_token;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }

}

export default setAuthToken;