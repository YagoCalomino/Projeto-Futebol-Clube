import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); // test

import { teams } from './mocks/Team.mocks.';

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de Equipes', function () {
    beforeEach(function () { sinon.restore(); });

    it('deve retornar uma lista de equipes', async function () {
        sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

        const res: Response = await chai.request(app).get('/teams');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(teams);
    });

    it('deve retornar uma equipe por id', async function() {
        sinon.stub(SequelizeTeam, 'findOne').resolves(teams as any);

        const res: Response = await chai.request(app).get('/teams/1');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(teams);
    })

    it('deve retornar não encontrado se a equipe não existir', async function() {
        sinon.stub(SequelizeTeam, 'findOne').resolves(null);

        const res: Response = await chai.request(app).get('/teams/1');

        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Equipe 1 não encontrada');
    });
});
