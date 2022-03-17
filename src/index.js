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
exports.checkLocalStorage = exports.fetchData = exports.populationsHaveChanged = exports.getAndCheckDateWithExpiry = exports.checkIfDataExpired = void 0;
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
const checkIfDataExpired = function (storageDateExpiryTimestamp, newDate) {
    const todaysTimestamp = newDate.getTime();
    if (storageDateExpiryTimestamp >= todaysTimestamp) {
        console.log("Data is expired!");
        return true;
    }
    else {
        console.log("Data doesn't exist or hasn't expired.");
        return false;
    }
};
exports.checkIfDataExpired = checkIfDataExpired;
// 4) Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
const getAndCheckDateWithExpiry = function (key) {
    const itemString = localStorage.getItem(key);
    const dateExpiry = JSON.parse(itemString);
    const checkedData = !(0, exports.checkIfDataExpired)(dateExpiry.expiry, now);
    return checkedData;
};
exports.getAndCheckDateWithExpiry = getAndCheckDateWithExpiry;
// 5) Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
const populationsHaveChanged = function (oldData, newData) {
    if (!oldData)
        oldData = [];
    if (!newData)
        newData = [];
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
    // Fake population change
    // oldPopulationsData[1].population = 20;
    // newPopulationsData[100].population = 20000;
    let populationIsChanged = false;
    for (let i = 0; i < oldPopulationsData.length; i++) {
        if (oldPopulationsData[i].population !== newPopulationsData[i].population) {
            console.log(oldPopulationsData[i].name);
            populationIsChanged = true;
        }
    }
    if (populationIsChanged)
        return true;
    else
        return false;
};
exports.populationsHaveChanged = populationsHaveChanged;
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
exports.fetchData = fetchData;
const checkLocalStorage = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Set new expiry date
            setDateWithExpiry(config_1.LOCAL_STORAGE_KEY, now, config_1.WEEK_TIMESTAMP);
            // Check if data expired
            const dataExpired = (0, exports.getAndCheckDateWithExpiry)(config_1.LOCAL_STORAGE_KEY);
            // If data is expired -> fetchData and overwrite
            if (dataExpired) {
                // 1) Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
                const storageData = localStorage.getItem("TP");
                const oldData = JSON.parse(storageData);
                const newData = yield (0, exports.fetchData)();
                // console.log("newData", newData);
                // 2) Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
                if (newData) {
                    localStorage.setItem("TP", JSON.stringify(newData));
                    (0, exports.populationsHaveChanged)(oldData, newData);
                    return JSON.parse(localStorage.getItem("TP"));
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
(0, exports.fetchData)();
(0, exports.checkLocalStorage)();
