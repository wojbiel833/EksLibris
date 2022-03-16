"use strict";
// import { checkLocalStorage, getWithExpiry, setWithExpiry } from "./index.js";
// jest.mock("./index");
// const mockFetchData = () => Promise.resolve([]);
// const mockSetWithExpiry = jest.fn((key, value, ttl) => {
//   if (typeof key !== "string") return "Error";
//   if (typeof value !== "object") return "Error";
//   if (typeof ttl !== "number") return "Error";
//   else return true;
// });
// const mockGetWithExpiry = jest.fn((key, oldData) => {
//   if (typeof key !== "string") return "Error";
//   if (typeof oldData !== "object") return "Error";
// });
// const mockCheckLocalStorage = jest.fn(() => {
//   if (
//     mockSetWithExpiry("string", new Date(), 1000000) !== "Error" &&
//     mockGetWithExpiry("apple", {}) !== "Error"
//   )
//     return "local storage checked";
// });
// describe("mockFetchData", () => {
//   let data: {};
//   beforeEach(async () => {
//     data = await mockFetchData();
//   });
//   it("returns the right value", () => {
//     expect(data).toEqual([]);
//   });
// });
// describe("mocksetWithExpiry", () => {
//   it("returns right output with right aruments types", () => {
//     expect(mockSetWithExpiry("string", new Date(), 1000000)).toBe(true);
//     expect(mockSetWithExpiry(2, new Date(), 1000000)).toBe("Error");
//     expect(mockSetWithExpiry("string", "", 1000000)).toBe("Error");
//     expect(mockSetWithExpiry("string", new Date(), "1000000")).toBe("Error");
//   });
// });
// describe("mockgetWithExpiry", () => {
//   it("returns right output with right aruments types", () => {
//     expect(mockGetWithExpiry(2, new Date())).toBe("Error");
//     expect(mockGetWithExpiry("string", 1000000)).toBe("Error");
//   });
// });
// describe("mockCheckLocalStorage", () => {
//   it("returns right output if mockSetWithExpiry & mockGetWithExpiry return no Error", () => {
//     expect(mockCheckLocalStorage()).toBe("local storage checked");
//   });
// });
