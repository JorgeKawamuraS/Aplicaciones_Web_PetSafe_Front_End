import axios from 'axios';

const API_URL = 'https://petsafeapi20210630093603.azurewebsites.net/api/users/authenticate';
class AuthService {
    login(user) {
        console.log('About to request');
        return axios.post(API_URL, JSON.stringify({
                username: user.mail,
                password: user.password}),
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response)  {
                console.log(`Response arrived with status ${response.status}`);

                if (response.data.token) {
                    console.log(`user: ${response.data}`);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch(function (error)  {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log(error.message);
                }
                console.log(error.config);
                return error;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post('https://petsafeapi20210630093603.azurewebsites.net/api/users', {
            mail: user.mail,
            password: user.password,
            userTypeVet: user.userTypeVet
        });
    }
}

export default new AuthService();