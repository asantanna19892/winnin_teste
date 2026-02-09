class UsersService {
    constructor(request) {
        this.request = request;
        this.endpoint = '/usuarios';
    }

    async criar(payload) {
        return await this.request.post(this.endpoint, { data: payload });
    }

    async buscarPorId(id) {
        return await this.request.get(`${this.endpoint}/${id}`);
    }
}
module.exports = UsersService;