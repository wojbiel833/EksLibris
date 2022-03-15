import { fetchData } from ".";

// describe("add function", () => {
//   it("prints right output 2 + 2 = 4", () => {
//     expect(2 + 2).toBe(4);
//   });
// });

const MOCK_OUTPUT = { data: {} };

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_OUTPUT),
  })
) as jest.Mock;

describe("fetchData", () => {
  let data: {};

  beforeEach(async () => {
    data = await fetchData();
  });

  it("returns the right value", () => {
    expect(data).toEqual({});
  });
});
