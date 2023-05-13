const URL = 'https://restcountries.com';

export function searchByName(name) {
  return fetch(
    `${URL}/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      console.clear();
      throw new Error(response.status);
    }
    return response.json();
  });
}
