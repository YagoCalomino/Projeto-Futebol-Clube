import * as chai from "chai";
import * as sinon from "sinon";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from '../app'
import { expect } from "chai";

import Teams from "../database/models/teamsModel";
import teamMock from "./mocks/teamMock";

describe("TeamsService", () => {
  describe("getAll", () => {
    it("should return all teams", async () => {
      const TeamsMockModel = Teams.bulkBuild(teamMock)

      const findAllStub = sinon.stub(Teams, "findAll").resolves(TeamsMockModel);

      const result = await chai.request(app).get('/teams')

      expect(result.status).to.deep.equal(200);

      sinon.restore();
    });
  })

  describe("getById", () => {
    it("should return a team by id", async () => {
      const TeamsMockModel = Teams.build(teamMock[0])

      const findByPkStub = sinon.stub(Teams, "findByPk").resolves(TeamsMockModel);

      const result = await chai.request(app).get('/teams/1')

      expect(result.status).to.deep.equal(200);

      sinon.restore();
    });
  })
});
