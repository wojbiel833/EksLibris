// 1) Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
// 2) Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
// 3) Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,
// 4) Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
// 5) Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
import { WEEK_TIMESTAMP, TODAYS_DATE, API_URL, KEY } from "../config";

export const setWithExpiry = function (key: string, value: Date, ttl: number) {
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

export const getWithExpiry = async function (key: string, oldData: any) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return;

  const dateExpiry = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() >= dateExpiry.expiry) {
    const newData = await fetchData(API_URL);
    // console.log(newData);
    localStorage.setItem("oldData", JSON.stringify(localStorage.TP));
    localStorage.setItem("TP", JSON.stringify(oldData));

    const oldStorageData = JSON.parse(JSON.parse(localStorage.oldData));
    // console.log(oldData);

    interface Country {
      name: string;
      population: number;
    }

    const oldStorage: Country[] = [];
    oldStorageData.forEach((country: Country) => {
      oldStorage.push({ name: country.name, population: country.population });
    });

    const newStorage: Country[] = [];
    newData.forEach((country: Country) => {
      newStorage.push({ name: country.name, population: country.population });
    });

    // 5)
    const getChangedPopulation = function (oldStorage: any, newStorage: any) {
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
};

// 1)
export const fetchData = async function (url: string) {
  try {
    const res = await fetch(url);
    // console.log("res", res);
    const TP = await res.json();
    // console.log("TP", [...TP]);
    // console.log(localStorage.TP, localStorage.oldData);

    // 3)
    if (!localStorage.TP) console.log("No data found...");
    // 2)
    getWithExpiry(KEY, TP);

    // 4)
    setWithExpiry(KEY, TODAYS_DATE, WEEK_TIMESTAMP);

    localStorage.setItem("TP", JSON.stringify(TP));
    // console.log(TP);
    return TP;
  } catch (err) {
    console.log(err);
  }
};

export const add = (a: number, b: number) => a + b;

fetchData(API_URL);

export default "index";
// console.log("last local", localStorage);

// Kod powinien być w pełni otypowany.
// Kod powinien posiadać pełen zestaw testów (Jest).
// Kod może posiadać komentarze.

// Co z typami any przy tablicach? jak to zrobic?

// Pętli for uzywam bo łatwo szubko porównać obie populacje. Takie rozwiązanie wpadło mi do głowy to tak zaimpementowałem :P
