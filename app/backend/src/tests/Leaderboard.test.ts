import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { leaderboardMock, teamsMatchesMock } from './mocks/Leaderboard.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Test', () => {
    it('should return home leaderboard', async () => {
        sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMatchesMock as any);

        const { status, body } = await chai.request(app).get('/leaderboard/home');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(leaderboardMock);
    });

    afterEach(sinon.restore);
})