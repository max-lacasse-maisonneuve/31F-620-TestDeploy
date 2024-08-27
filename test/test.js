import { assert, expect } from "chai";
import Abribus from "../assets/js/classes/Abribus.js";

describe("Tests abribus", function () {
    let abribus = new Abribus(1, "123 rue de la rue", "2021-09-28", "devant la maison", "Québec");

    describe("set id", function () {
        it("should return 1", function () {
            assert.equal(abribus.id, 1);
        });
        it("should return 2", function () {
            abribus.id = 2;
            assert.equal(abribus.id, 2);
        });
        it("should throw error if id is negative", function () {
            expect(() => {
                abribus.id = -1;
            }).to.throw("L'identifiant ne peut pas être négatif.");
        });
    });
});
