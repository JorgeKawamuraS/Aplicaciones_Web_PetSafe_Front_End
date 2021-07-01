<<<<<<< HEAD
import http from './common/http.common';

class SpecialtiesApiService{

    getAll(){
        return http.get('/specialties');
    }

    getById(id){
        return http.get(`/specialties/${id}`);
    }
    create(data){
        return http.post(`/specialties`,data);
    }
    delete(id){
        return http.delete(`/specialties/${id}`);
    }
    update(id,data){
        return http.put(`/specialties/${id}`,data);
=======
import axios from 'axios';

class SpecialtiesApiService{
    http = null;

    constructor() {
        this.http = axios.create({
            baseUrl: 'http://lacuenta-001-site1.itempurl.com/api',
            headers: {'Content-type': 'application/json'}
        })
    }

    getAll(){
        return this.http.get('/specialties');
    }

    getById(id){
        return this.http.get(`/specialties/${id}`);
    }
    create(data){
        return this.http.post(`/specialties`,data);
    }
    delete(id){
        return this.http.delete(`/specialties/${id}`);
    }
    update(id,data){
        return this.http.put(`/specialties/${id}`,data);
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    }
}

export default new SpecialtiesApiService();