import { WEEK_TIMESTAMP, API_URL, LOCAL_STORAGE_KEY } from "../config";

const now = new Date();

// Adding an date expiry object to localSorage under "fetchData"
export const setDateWithExpiry = function (
  key: string,
  value: Date,
  ttl: number
) {
  const dateExpiry = {
    value: value,
    expiry: value.getTime() + ttl,
  };

  // Check if object is already there, if not add
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(dateExpiry));
  } else console.log(`The local storage already has key "${key}" in use.`);
};

// 4) Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
export const getDateWithExpiry = async function (key: string) {
  const itemString = localStorage.getItem(key)!;
  let dateExpiry = JSON.parse(itemString);

  // Checking if the downloadad data is fresh
  if (!dateExpiry) {
    return false;
  } else if (dateExpiry && now.getTime() >= dateExpiry.expiry) {
    return true;
  }
};

// 1)
let TP: [] = [];
const fetchData = async function () {
  try {
    const res = await fetch(API_URL);
    TP = await res.json();

    if (!localStorage.TP) {
      localStorage.setItem("TP", JSON.stringify(TP));
    }

    return TP;
  } catch (err) {
    console.log(err);
  }
};

interface Country {
  name: string;
  population: number;
}

const comparePopulations = function (oldData: Country[], newData: Country[]) {
  const oldPopulationsData: Country[] = [];
  const newPopulationsData: Country[] = [];

  oldData.forEach((country: Country) => {
    oldPopulationsData.push({
      name: country.name,
      population: country.population,
    });
  });

  newData.forEach((country: Country) => {
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

export const checkLocalStorage = async function () {
  try {
    setDateWithExpiry(LOCAL_STORAGE_KEY, now, WEEK_TIMESTAMP);

    const dataIsExpired = await getDateWithExpiry(LOCAL_STORAGE_KEY);
    // If data is expired -> fetchData and overwrite
    if (dataIsExpired) {
      // 1) Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
      const storageData = localStorage.getItem("TP")!;

      const oldData: [] = JSON.parse(storageData);
      const newData: any = await fetchData();

      // 2) Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
      if (newData) {
        localStorage.setItem("TP", JSON.stringify(newData));

        // 5) Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
        comparePopulations(oldData, newData);

        return "Local storage overwritten.";
      } else {
        console.log("Fetch unsuccesful!");
        return "Fetch unsuccesful!";
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// 3) Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,

fetchData();

checkLocalStorage();
