import http from '../common/http.common';

class CitiesApiService{

    getAll(){
        return http.get('/cities');
    }
    getById(id){
        return http.get(`/cities/${id}`);
    }

}

export default new CitiesApiService();