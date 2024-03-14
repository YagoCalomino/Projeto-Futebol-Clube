import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';

import { Response } from 'superagent';
import { invalidLoginMock, loginMock } from './mocks/User.mock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

// Iniciando os testes de login
describe('Login Test', function () {
    // Restaurando os stubs antes de cada teste
    beforeEach(function () { sinon.restore(); });

    // Teste para verificar se o login é inválido
    it('should return invalid login', async function () {
        const stubLogin = SequelizeUser.build(invalidLoginMock);
        sinon.stub(SequelizeUser, 'findOne').resolves(stubLogin);

        const response = await chai.request(app).get('/login');

        // Verificando se o status da resposta é 404
        expect(response.status).to.equal(404);
    });

    // Teste para verificar se a solicitação é ruim sem email
    it('should return bad request without email', async function () {
        const httpReqBody = {
            password: 'secrets_admin'
        };
        const response = await chai.request(app).post('/login').send(httpReqBody);

        // Verificando se o status da resposta é 400 e se a mensagem é correta
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    // Teste para verificar se a solicitação é ruim sem senha
    it('should return bad request without password', async function () {
        const httpReqBody = {
            email: 'admin@admin.com'
        };
        const response = await chai.request(app).post('/login').send(httpReqBody);

        // Verificando se o status da resposta é 400 e se a mensagem é correta
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    // Teste para verificar se retorna não autorizado com email inválido
    it('should return unauthorized with invalid email', async function () {
        const httpReqBody = {
            email: 'admin@admin.com',
            password: 'secrets_admin'
        };
        const response = await chai.request(app).post('/login').send(httpReqBody);

        // Verificando se o status da resposta é 401 e se a mensagem está presente
        expect(response.status).to.equal(401);
        expect(response.body).to.have.property('message');
    });
});
