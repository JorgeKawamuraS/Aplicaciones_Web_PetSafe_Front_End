import http from './common/http.common'

class RemindersApiService {
    getAll() {
        return http.get('/recordatories');
    }
    get(id) {
        return http.get(`recordatories/${id}`)
    }
    create(data) {
        return http.post('/recordatories', data);
    }
    update(id, data) {
        return http.put(`/recordatories/${id}`, data);
    }
    delete(id) {
        return http.delete(`/recordatories/${id}`)
    }
    deleteAll() {
        return http.delete('/recordatories');
    }
}

export default new RemindersApiService();