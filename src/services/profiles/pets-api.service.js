import http from '../common/http.common'

class PetsApiService{

    getById(id){
        return http.get(`/pets/${id}`);
    }
    getPetOwnerById(id){
        return http.get(`/pets/${id}/petowners`);
    }
    update(id,data){
        return http.put(`/vets/${id}`,data);
    }
    createPetOwner(petId,ownerId,data){
        return http.post(`pets/${petId}/owners/${ownerId}`,data);
    }
}

export default new PetsApiService();