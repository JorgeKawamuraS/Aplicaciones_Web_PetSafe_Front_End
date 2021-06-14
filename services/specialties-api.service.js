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
    }
}

export default new SpecialtiesApiService();