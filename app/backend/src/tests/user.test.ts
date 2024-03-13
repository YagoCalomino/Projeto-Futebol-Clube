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

describe('Login Test', function () {
    beforeEach(function () { sinon.restore(); });

    it('should return invalid login', async function () {
        const stubLogin = SequelizeUser.build(invalidLoginMock);
        sinon.stub(SequelizeUser, 'findOne').resolves(stubLogin);

        const response = await chai.request(app).get('/login');

        expect(response.status).to.equal(404);
    });

    it('should return bad request without email', async function () {
        const httpReqBody = {
            password: 'secrets_admin'
        };
        const response = await chai.request(app).post('/login').send(httpReqBody);

        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('should return bad request without password', async function () {
        const httpReqBody = {
            email: 'admin@admin.com'
        };
        const response = await chai.request(app).post('/login').send(httpReqBody);

        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('should return unauthorized with invalid email', async function () {
        const httpReqBody = {
            email: 'admin@admin.com',
            password: 'secrets_admin'
        };
        const response = await chai.request(app).post('/login').send(httpReqBody);

        expect(response.status).to.equal(401);
        expect(response.body).to.have.property('message');
    });
});
