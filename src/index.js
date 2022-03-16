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
exports.checkLocalStorage = exports.getDateWithExpiry = exports.setDateWithExpiry = void 0;
const config_1 = require("../config");
const now = new Date();
// Adding an date expiry object to localSorage under "fetchData"
const setDateWithExpiry = function (key, value, ttl) {
    const dateExpiry = {
        value: value,
        expiry: value.getTime() + ttl,
    };
    // Check if object is already there, if not add
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(dateExpiry));
    }
    else
        console.log(`The local storage already has key "${key}" in use.`);
};
exports.setDateWithExpiry = setDateWithExpiry;
// 4) Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
const getDateWithExpiry = function (key) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemString = localStorage.getItem(key);
        let dateExpiry = JSON.parse(itemString);
        // Checking if the downloadad data is fresh
        if (!dateExpiry) {
            return false;
        }
        else if (dateExpiry && now.getTime() >= dateExpiry.expiry) {
            return true;
        }
    });
};
exports.getDateWithExpiry = getDateWithExpiry;
// 1)
let TP = [];
const fetchData = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(config_1.API_URL);
            TP = yield res.json();
            if (!localStorage.TP) {
                localStorage.setItem("TP", JSON.stringify(TP));
            }
            return TP;
        }
        catch (err) {
            console.log(err);
        }
    });
};
const comparePopulations = function (oldData, newData) {
    const oldPopulationsData = [];
    const newPopulationsData = [];
    oldData.forEach((country) => {
        oldPopulationsData.push({
            name: country.name,
            population: country.population,
        });
    });
    newData.forEach((country) => {
        newPopulationsData.push({
            name: country.name,
            population: country.population,
        });
    });
    // // Fake population change
    oldPopulationsData[1].population = 20;
    newPopulationsData[100].population = 20000;
    for (let i = 0; i < oldPopulationsData.length; i++) {
        if (oldPopulationsData[i].population !== newPopulationsData[i].population)
            console.log(oldPopulationsData[i].name);
    }
};
const checkLocalStorage = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, exports.setDateWithExpiry)(config_1.LOCAL_STORAGE_KEY, now, config_1.WEEK_TIMESTAMP);
            const dataIsExpired = yield (0, exports.getDateWithExpiry)(config_1.LOCAL_STORAGE_KEY);
            // If data is expired -> fetchData and overwrite
            if (dataIsExpired) {
                // 1) Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
                const storageData = localStorage.getItem("TP");
                const oldData = JSON.parse(storageData);
                const newData = yield fetchData();
                // 2) Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
                if (newData) {
                    localStorage.setItem("TP", JSON.stringify(newData));
                    // 5) Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
                    comparePopulations(oldData, newData);
                    return "Local storage overwritten.";
                }
                else {
                    console.log("Fetch unsuccesful!");
                    return "Fetch unsuccesful!";
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    });
};
exports.checkLocalStorage = checkLocalStorage;
// 3) Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,
fetchData();
(0, exports.checkLocalStorage)();
