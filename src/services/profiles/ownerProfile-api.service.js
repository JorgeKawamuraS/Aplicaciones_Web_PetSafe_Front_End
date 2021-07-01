import http from '../common/http.common';

class OwnerProfileApiService{

    getAll(){
        return http.get('/owners');
    }
    getById(id){
        return http.get(`/owners/${id}`);
    }
    getPetsById(id){
        return http.get(`/owners/${id}/petowners`);
    }
    create(data){
        return http.post(`/owners`,data);
    }
    delete(id){
        return http.delete(`/owners/${id}`);
    }
    update(id,data){
        return http.put(`/owners/${id}`,data);
    }
    getOwnerByUserId(userId){
        return http.get(`/owners?userId=${userId}`);
    }
}

export default new OwnerProfileApiService();