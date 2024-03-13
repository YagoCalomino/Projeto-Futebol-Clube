import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { teams } from './mocks/Team.mocks.';

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Test', function () {
    beforeEach(function () { sinon.restore(); });

    it('should return a list of teams', async function () {
        sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

        const { status, body } = await chai.request(app).get('/teams');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(teams);
    });

    it('should return a team by id', async function() {
        sinon.stub(SequelizeTeam, 'findOne').resolves(teams as any);

        const { status, body } = await chai.request(app).get('/teams/1');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(teams);
    })
});
