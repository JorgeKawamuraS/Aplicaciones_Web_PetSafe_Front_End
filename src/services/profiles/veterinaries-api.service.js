import http from "@/services/common/http.common";

class VeterinariesApiService{

    getAll(){
        return http.get('/veterinaries');
    }

    getSpecialtiesByVeterinaryId(id){
        return http.get(`/veterinaries/${id}/veterinaryspecialties`)
    }

    getVeterinaryById(id){
        return http.get(`/veterinaries/${id}`);
    }
    create(data){
        return http.post(`/veterinaries`,data);
    }
    delete(id){
        return http.delete(`/veterinaries/${id}`);
    }
    update(id,data){
        return http.put(`/veterinaries/${id}`,data);
    }

    createVetVeterinary(vetId,veterinaryId){
        return http.post(`/veterinary/${veterinaryId}/vet/${vetId}`);
    }

    createVeterinarySpecialty(veterinaryId,specialtyId){
        return http.post(`/veterinary/${veterinaryId}/specialty/${specialtyId}`)
    }

}

export default new VeterinariesApiService();