import http from '../common/http.common';

class ProvinceApiService{

    getAll(){
        return http.get('/provinces');
    }

    getById(id){
        return http.get(`/provinces/${id}`);
    }

    getCitiesByProvinceId(id){
        return http.get(`/provinces/${id}/cities`)
    }

    createOwner(provinceId,cityId,userId,data){
        return http.post(`provinces/${provinceId}/cities/${cityId}/users/${userId}/owners`,data)
    }

    createVet(provinceId,cityId,userId,data){
        return http.post(`provinces/${provinceId}/cities/${cityId}/users/${userId}/vets`,data)
    }

    createPet(provinceId,cityId,data){
        return http.post(`provinces/${provinceId}/cities/${cityId}/pets`,data)
    }

    createVeterinary(provinceId,cityId,data){
        return http.post(`provinces/${provinceId}/cities/${cityId}/veterinaries`,data)
    }

}

export default new ProvinceApiService();