<<<<<<< HEAD
import http from "@/services/common/http.common";

class VetVeterinariesApiService{

    getVetVeterinariesByVetId(id){
        return http.get(`/vets/${id}/vetveterinaries`);
=======
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
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    }


}

export default new VetVeterinariesApiService();