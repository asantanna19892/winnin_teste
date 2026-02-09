class CartsService {
    constructor(request) {
        this.request = request;
        this.endpoint = '/carrinhos';
    }

    async cadastrar(payload, token) {
        return await this.request.post(this.endpoint, {
            headers: { Authorization: token },
            data: payload
        });
    }
}
module.exports = CartsService;