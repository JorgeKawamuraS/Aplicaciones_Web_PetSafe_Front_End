import http from '../common/http.common';

class UsersApiService{

    getAll(){
        return http.get('/users');
    }

    getVetByUserId(id){
        return http.get(`/users/${id}/vets`)
    }

    getOwnerByUserId(id){
        return http.get(`/users/${id}/owner`)
    }

    getById(id){
        return http.get(`/users/${id}`);
    }
    create(data){
        return http.post(`/users`,data);
    }
    delete(id){
        return http.delete(`/users/${id}`);
    }
    update(id,data){
        return http.put(`/users/${id}`,data);
    }
}

export default new UsersApiService();