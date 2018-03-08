require("dotenv").config({ path: "./.env.local" });
const chai = require("chai");
const chaiHttp = require("chai-http");
const spies = require("chai-spies");
const PokemonController = require("../../api/controllers/pokemonController");

chai.use(chaiHttp);
chai.use(spies);
process.env.PORT = process.env.TEST_PORT || require("../../utils/consts").defaultTestPort;
process.env.NODE_ENV = require("../../utils/consts").testEnv;
const ROUTE_PREFIX = "pokemons";

chai.spy.on(PokemonController, "list_all_pokemons", (req, res) => res.json([]));
chai.spy.on(PokemonController, "create_pokemon", (req, res) => res.json(req.body));

describe("pokemons routes", () => {
    let server = null;
    beforeAll(() => {
        server = require("../../bin/www");
    });

    it("should get and return an array", done => {
        return chai.request(server)
            .get("/pokemons")
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.status).toBe(200);
                expect(res.ok).toBe(true);
                expect(res.type).toBe("application/json");
                expect(res.body).toEqual([]);
                done();
            });
    });

    it("should post and create a pokemon", done => {
        const pokemon = {
            "name": "dydy",
            "description": "Le plus crade de tous les pokemon",
            "id_parent": 0,
            "image": "prout",
            "id_national": 1000,
            "type1": 0,
            "type2": 0,
        };
        chai.request(server)
            .post(`/${ROUTE_PREFIX}`)
            .send(pokemon)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.status).toBe(200);
                expect(res.ok).toBe(true);
                expect(res.type).toBe("application/json");
                expect(res.body.name).toEqual("dydy");
                done();
            });
    });

    afterAll(async () => {
        await server.close();
    });
});
