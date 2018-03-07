require("dotenv").config({ path: "./.env.local" });
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
process.env.PORT = process.env.TEST_PORT;
const server = require('../../bin/www');

describe('GET /', () => {
    it('should return json', done => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.status).toBe(200);
                expect(res.ok).toBe(true);
                expect(res.type).toBe('application/json');
                expect(res.body).toEqual({coucou: 'coucou'});
                done();
            });
    });

    afterAll(async () => {
        await server.close();
    })
});
