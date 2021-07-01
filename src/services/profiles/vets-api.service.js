import http from '../common/http.common'

class VetsApiService{

    getById(id){
        return http.get(`/vets/${id}`);
    }
    getVetByUserId(userId){
        return http.get(`/vets?userId=${userId}`);
    }
    getVetVeterinaryByUserId(id){
        return http.get(`/vets/${id}/vetveterinaries`);
    }
    update(id,data){
        return http.put(`/vets/${id}`,data);
    }

}

export default new VetsApiService();