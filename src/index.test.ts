import { populationsHaveChanged, checkIfDataExpired } from "./index";
import { Country } from "./interfaces";

describe("populationsHaveChanged", () => {
  it("should return right output if populations have changed or not", () => {
    const unchangedPopulationOld: Country[] = [
      {
        name: "Spain",
        population: 10000000,
      },
    ];
    const unchangedPopulationNew: Country[] = [
      {
        name: "Spain",
        population: 10000000,
      },
    ];

    const changedPopulationOld: Country[] = [
      {
        name: "Ukraine",
        population: 10000000,
      },
    ];
    const changedPopulationNew: Country[] = [
      {
        name: "Ukraine",
        population: 100000,
      },
    ];
    const unchangedPopulations = populationsHaveChanged(
      unchangedPopulationOld,
      unchangedPopulationNew
    );
    const changedPopulations = populationsHaveChanged(
      changedPopulationOld,
      changedPopulationNew
    );

    expect(unchangedPopulations).toBe(false);
    expect(changedPopulations).toBe(true);
  });
});

describe('"checkIfDataExpired', () => {
  it("return right output if data is expired", () => {
    expect(checkIfDataExpired(100000000000000, new Date())).toBe(true);
    expect(checkIfDataExpired(100, new Date())).toBe(false);
  });
});
