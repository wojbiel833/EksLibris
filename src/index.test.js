"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("populationsHaveChanged", () => {
    it("should return right output if populations have changed or not", () => {
        const unchangedPopulationOld = [
            {
                name: "Spain",
                population: 10000000,
            },
        ];
        const unchangedPopulationNew = [
            {
                name: "Spain",
                population: 10000000,
            },
        ];
        const changedPopulationOld = [
            {
                name: "Ukraine",
                population: 10000000,
            },
        ];
        const changedPopulationNew = [
            {
                name: "Ukraine",
                population: 100000,
            },
        ];
        const unchangedPopulations = (0, index_1.populationsHaveChanged)(unchangedPopulationOld, unchangedPopulationNew);
        const changedPopulations = (0, index_1.populationsHaveChanged)(changedPopulationOld, changedPopulationNew);
        expect(unchangedPopulations).toBe(false);
        expect(changedPopulations).toBe(true);
    });
});
describe('"checkIfDataExpired', () => {
    it("return right output if data is expired", () => {
        expect((0, index_1.checkIfDataExpired)(100000000000000, new Date())).toBe(true);
        expect((0, index_1.checkIfDataExpired)(100, new Date())).toBe(false);
    });
});
