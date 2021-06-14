import axios from 'axios';

class VetVeterinariesApiService{
    http = null;

    constructor() {
        this.http = axios.create({
            baseUrl: 'http://localhost:3000/api',
            headers: {'Content-type': 'application/json'}
        })
    }

    getVetVeterinariesByVetId(id){
        return this.http.get(`/vetVeterinaries?vetId=${id}`);
    }


}

export default new VetVeterinariesApiService();