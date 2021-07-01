import axios from 'axios';

class VeterinariesApiService{
    http = null;

    constructor() {
        this.http = axios.create({
            baseUrl: 'http://localhost:3000/api',
            headers: {'Content-type': 'application/json'}
        })
    }

    getAll(){
        return this.http.get('/veterinaries');
    }

    getVeterinaryById(id){
        return this.http.get(`/veterinaries/${id}`);
    }
    create(data){
        return this.http.post(`/veterinaries`,data);
    }
    delete(id){
        return this.http.delete(`/veterinaries/${id}`);
    }
    update(id,data){
        return this.http.put(`/veterinaries/${id}`,data);
    }
}

export default new VeterinariesApiService();