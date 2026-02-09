class LoginService {
    constructor(request) {
        this.request = request;
        this.endpoint = '/login';
    }

    async logar(email, password) {
        return await this.request.post(this.endpoint, {
            data: { email, password }
        });
    }
}
module.exports = LoginService;