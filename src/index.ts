// JS
/*
const weekTimestamp = 7 * 24 * 60 * 60 * 60 * 1000;
const todaysDate = new Date();

const setWithExpiry = function (key, value, ttl) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = async function (key, oldData) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return;

  const item = JSON.parse(itemStr);

  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.setItem("oldData", JSON.stringify(oldData));

    const newData = await fetchData("https://restcountries.com/v2/all");

    const data1 = [];
    oldData.map((country) => {
      data1.push({ name: country.name, population: country.population });
    });
    const data2 = [];
    newData.map((country) => {
      data2.push({ name: country.name, population: country.population });
    });

    // 5)Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
    const getChangedPopulation = function (data1, data2) {
      //   console.log("data1", data1);
      //   console.log("data2", data2);
      // Fake population change
      data1[1].population = 2;
      data2[100].population = 20000;

      for (let i = 0; i < data1.length; i++) {
        if (data1[i].population !== data2[i].population)
          console.log(data1[i].name);
      }
    };

    getChangedPopulation(data1, data2);
    return item;
  }
};

// 1)Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
const fetchData = async function (url) {
  const res = await fetch(url);
  //   console.log("res", res);
  const TP = await res.json();
  //   console.log("TP", [...TP]);

  // 3)Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,
  if (!TP) return;
  // 2)Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
  getWithExpiry("fetchDate", TP);
  // 4)Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
  setWithExpiry("fetchDate", todaysDate, 3000);
  localStorage.setItem("TP", JSON.stringify(TP));
  return TP;
};

fetchData("https://restcountries.com/v2/all");
// console.log("last local", localStorage);
*/

// TS
import * as config from "../config";

const setWithExpiry = function (key: string, value: Date, ttl: number) {
  const now = new Date();

  const dateExpiry = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(dateExpiry));
};

const getWithExpiry = async function (key: string, oldData: any) {
  const itemStr = localStorage.getItem(config.KEY);
  if (!itemStr) return;

  const dateExpiry = JSON.parse(itemStr);
  //   console.log(item);
  const now = new Date();
  if (now.getTime() > dateExpiry.expiry) {
    const newData = await fetchData(config.API_URL);

    localStorage.setItem("oldData", JSON.stringify(localStorage.TP));
    localStorage.setItem("TP", JSON.stringify(oldData));

    const oldStorageData = JSON.parse(JSON.parse(localStorage.oldData));

    const oldStorage: any = [];
    oldStorageData.forEach((country: { name: never; population: never }) => {
      oldStorage.push({ name: country.name, population: country.population });
    });

    const newStorage: any = [];
    newData.forEach((country: { name: never; population: never }) => {
      newStorage.push({ name: country.name, population: country.population });
    });

    // 5)Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
    const getChangedPopulation = function (oldStorage: any, newStorage: any) {
      //   console.log("oldStorage", oldStorage);
      //   console.log("newStorage", newStorage);
      // Fake population change
      oldStorage[1].population = 2;
      newStorage[100].population = 20000;

      for (let i = 0; i < oldStorage.length; i++) {
        if (oldStorage[i].population !== newStorage[i].population)
          console.log(oldStorage[i].name);
      }
    };

    getChangedPopulation(oldStorage, newStorage);
  }
};

// 1)Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
const fetchData = async function (url: string) {
  const res = await fetch(url);
  //   console.log("res", res);
  const TP = await res.json();
  //   console.log("TP", [...TP]);
  //   console.log(localStorage.TP, localStorage.oldData);

  // 3)Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,
  if (!localStorage.TP || !localStorage.oldData)
    console.log("No data found...");
  // 2)Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
  getWithExpiry(config.KEY, TP);
  // 4)Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
  setWithExpiry(config.KEY, config.TODAYS_DATE, config.WEEK_TIMESTAMP);
  localStorage.setItem("TP", JSON.stringify(TP));
  return TP;
};

fetchData(config.API_URL);
// console.log("last local", localStorage);

// Kod powinien być w pełni otypowany.
// Kod powinien posiadać pełen zestaw testów (Jest).
// Kod może posiadać komentarze.

// export default "index.ts";

// Co z typami any przy tablicach? jak to zrobic?

// Pętli for uzywam bo łatwo szubko porównać obie populacje. Takie rozwiązanie wpadło mi do głowy to tak zaimpementowałem :P
