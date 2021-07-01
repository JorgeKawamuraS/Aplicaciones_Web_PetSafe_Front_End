import axios from 'axios'

export default axios.create({
        baseURL: 'https://petsafeapi20210630093603.azurewebsites.net/api',
        headers: {'Content-type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
});