import http from '../common/http.common';

class IllnessesApiService{

    getAll(){
        return http.get('/illnesses');
    }

    getById(id){
        return http.get(`/illnesses/${id}`);
    }
    create(data){
        return http.post(`/illnesses`,data);
    }
    delete(id){
        return http.delete(`/illnesses/${id}`);
    }
    update(id,data){
        return http.put(`/illnesses/${id}`,data);
    }
}

export default new IllnessesApiService();