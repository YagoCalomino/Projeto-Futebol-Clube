import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';

import { Response } from 'superagent';
import { matches, matchesInProgress } from './mocks/Match.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', function () {
    beforeEach(function () { sinon.restore(); });

    it('should return a list of matches', async function () {
        sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

        const responseMatch = await chai.request(app).get('/matches');

        expect(responseMatch.status).to.equal(200);
        expect(responseMatch.body).to.deep.equal(matches);
    });

    it('should return a list of matches in progress', async function() {
        sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);

        const responseMatch = await chai.request(app).get('/matches?inProgress=true');

        expect(responseMatch.status).to.equal(200);
        expect(responseMatch.body).to.deep.equal(matchesInProgress);
    });
})
