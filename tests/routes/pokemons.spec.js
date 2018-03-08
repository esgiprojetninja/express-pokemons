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

const pokemon = {
    "name": "dydy",
    "description": "Le plus crade de tous les pokemon",
    "id_parent": 0,
    "image": "prout",
    "id_national": 1000,
    "type1": 0,
    "type2": 0,
};

chai.spy.on(PokemonController, "list_all_pokemons", (req, res) => res.json([]));
chai.spy.on(PokemonController, "create_pokemon", (req, res) => res.json(req.body));
chai.spy.on(PokemonController, "read_pokemon", (req, res) => res.json(pokemon));
chai.spy.on(PokemonController, "update_pokemon", (req, res) => res.json({
    ...pokemon,
    description: "toto"
}));
chai.spy.on(PokemonController, "delete_pokemon", (req, res) => res.json(true));

describe("pokemons routes", () => {
    let server = null;
    beforeAll(() => {
        server = require("../../bin/www");
    });

    it("should get all pokemon", done => {
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

    it("should create a pokemon", done => {
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

    it("should find a pokemon", done => {
        chai.request(server)
            .get(`/${ROUTE_PREFIX}/1000`)
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

    it("should update a pokemon", done => {
        chai.request(server)
            .put(`/${ROUTE_PREFIX}/1000`)
            .send(pokemon)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.status).toBe(200);
                expect(res.ok).toBe(true);
                expect(res.type).toBe("application/json");
                expect(res.body.description).toEqual("toto");
                done();
            });
    });

    it("should delete a pokemon", done => {
        chai.request(server)
            .delete(`/${ROUTE_PREFIX}/1000`)
            .send(pokemon)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.status).toBe(200);
                expect(res.ok).toBe(true);
                expect(res.type).toBe("application/json");
                expect(res.body).toBe(true);
                done();
            });
    });


    afterAll(async () => {
        await server.close();
    });
});
