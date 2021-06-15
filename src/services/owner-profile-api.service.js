import http from './http.common';

class OwnerProfileApiService{
    get(id){
        return http.get(`/profile/${id}`);
    }
    update(id, data){
        return http.put(`/profile/${id}`, data);
    }
}

export default new OwnerProfileApiService();