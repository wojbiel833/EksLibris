"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// jest.mock("./index");
// const mockFetchData = () => Promise.resolve([]);
// describe("mockFetchData", () => {
//   let data: {};
//   beforeEach(async () => {
//     data = await mockFetchData();
//   });
//   it("returns the right value", () => {
//     expect(data).toEqual([]);
//   });
// });
describe("checkLocalStorage", () => {
    let a;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        a = yield (0, index_1.checkLocalStorage)();
    }));
    it("should return right output if data is expired", () => {
        // const dataIsExpired = true;
        // const dataNotExpired = true;
        expect(a).toBe("Local storage overwritten.");
    });
});
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
