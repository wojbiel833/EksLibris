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
exports.add = exports.fetchData = exports.getWithExpiry = exports.setWithExpiry = void 0;
// 1) Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
// 2) Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
// 3) Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,
// 4) Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
// 5) Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
const config_1 = require("../config");
const setWithExpiry = function (key, value, ttl) {
    // if (typeof key !== "string") return "Error";
    // if (typeof value !== Date()) return "Error";
    // if (typeof ttl !== "number") return "Error";
    const now = new Date();
    const dateExpiry = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(dateExpiry));
};
exports.setWithExpiry = setWithExpiry;
const getWithExpiry = function (key, oldData) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemStr = localStorage.getItem(key);
        if (!itemStr)
            return;
        const dateExpiry = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() >= dateExpiry.expiry) {
            const newData = yield (0, exports.fetchData)(config_1.API_URL);
            // console.log(newData);
            localStorage.setItem("oldData", JSON.stringify(localStorage.TP));
            localStorage.setItem("TP", JSON.stringify(oldData));
            const oldStorageData = JSON.parse(JSON.parse(localStorage.oldData));
            const oldStorage = [];
            oldStorageData.forEach((country) => {
                oldStorage.push({ name: country.name, population: country.population });
            });
            const newStorage = [];
            newData.forEach((country) => {
                newStorage.push({ name: country.name, population: country.population });
            });
            // 5)
            const getChangedPopulation = function (oldStorage, newStorage) {
                // console.log("oldStorage", oldStorage);
                // console.log("newStorage", newStorage);
                // Fake population change
                oldStorage[1].population = 20;
                newStorage[100].population = 20000;
                for (let i = 0; i < oldStorage.length; i++) {
                    if (oldStorage[i].population !== newStorage[i].population)
                        console.log(oldStorage[i].name);
                }
            };
            getChangedPopulation(oldStorage, newStorage);
        }
    });
};
exports.getWithExpiry = getWithExpiry;
// 1)
const fetchData = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url);
            // console.log("res", res);
            const TP = yield res.json();
            // console.log("TP", [...TP]);
            // console.log(localStorage.TP, localStorage.oldData);
            // 3)
            if (!localStorage.TP)
                console.log("No data found...");
            // 2)
            (0, exports.getWithExpiry)(config_1.KEY, TP);
            // 4)
            (0, exports.setWithExpiry)(config_1.KEY, config_1.TODAYS_DATE, config_1.WEEK_TIMESTAMP);
            localStorage.setItem("TP", JSON.stringify(TP));
            // console.log(TP);
            return TP;
        }
        catch (err) {
            console.log(err);
        }
    });
};
exports.fetchData = fetchData;
const add = (a, b) => a + b;
exports.add = add;
(0, exports.fetchData)(config_1.API_URL);
exports.default = "index";
// console.log("last local", localStorage);
// Kod powinien być w pełni otypowany.
// Kod powinien posiadać pełen zestaw testów (Jest).
// Kod może posiadać komentarze.
// Co z typami any przy tablicach? jak to zrobic?
// Pętli for uzywam bo łatwo szubko porównać obie populacje. Takie rozwiązanie wpadło mi do głowy to tak zaimpementowałem :P
