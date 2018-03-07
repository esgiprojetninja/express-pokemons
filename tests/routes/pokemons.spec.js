const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../bin/www');

describe('GET /pokemons', () => {
    it('should return array', done => {        
        chai.request(server)
            .get('/pokemons')
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.status).toBe(200);
                expect(res.ok).toBe(true);
                expect(res.type).toBe('application/json');
                expect(res.body).toEqual({pokemons: []});
                done();
            });
    });

    afterAll(async () => {
        await server.close();
    })
});
