require("dotenv").config({ path: "./.env.local" });
const chai = require("chai");
const chaiHttp = require("chai-http");
const spies = require("chai-spies");
const TypeController = require("../../api/controllers/typeController");

chai.use(chaiHttp);
chai.use(spies);
process.env.PORT = process.env.TEST_PORT || require("../../utils/consts").defaultTestPort;
process.env.NODE_ENV = require("../../utils/consts").testEnv;

chai.spy.on(TypeController, "listAllTypes", (req, res) => res.json([]));

describe("types routes", () => {
    let server = null;
    beforeAll(() => {
        server = require("../../bin/www");
    });

    it("should get all types", done => {
        return chai.request(server)
            .get("/types")
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.status).toBe(200);
                expect(res.ok).toBe(true);
                expect(res.type).toBe("application/json");
                expect(res.body).toEqual([]);
                done();
            });
    });

    afterAll(async () => {
        await server.close();
    });
});
