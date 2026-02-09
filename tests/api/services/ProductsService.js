class ProductsService {
    constructor(request) {
        this.request = request;
        this.endpoint = '/produtos';
    }

    async criar(payload, token) {
        return await this.request.post(this.endpoint, {
            headers: { Authorization: token },
            data: payload
        });
    }
}
module.exports = ProductsService;