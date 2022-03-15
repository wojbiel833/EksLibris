import { checkLocalStorage, getWithExpiry, setWithExpiry } from "./index.js";
jest.mock("./index");

const mockFetchData = () => Promise.resolve([]);
const mockSetWithExpiry = jest.fn((key, value, ttl) => {
  if (typeof key !== "string") return "Error";
  if (typeof value !== "object") return "Error";
  if (typeof ttl !== "number") return "Error";
  else return true;
});

describe("fetchData", () => {
  let data: {};

  beforeEach(async () => {
    data = await mockFetchData();
  });

  it("returns the right value", () => {
    expect(data).toEqual([]);
  });
});

// describe("checkLocalStorage", () => {
//   it('puts fetched data to localStorage under "TP" key', () => {
//     console.log(checkLocalStorage);
//     expect(checkLocalStorage).toBe(undefined);
//   });
// });

describe("setWithExpiry", () => {
  it("returns right output with right aruments", () => {
    expect(mockSetWithExpiry("string", new Date(), 1000000)).toBe(true);

    expect(mockSetWithExpiry(2, new Date(), 1000000)).toBe("Error");
    expect(mockSetWithExpiry("string", "", 1000000)).toBe("Error");
    expect(mockSetWithExpiry("string", new Date(), "1000000")).toBe("Error");
  });
});
