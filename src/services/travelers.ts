const URL = 'https://simulizer-back.onrender.com';

export async function getTravelers(page_number: number = 1) {
  return fetch(
    `${URL}/travelers?order=ASC&page=${page_number}&take=50`,
  ).then((v) => v.json()).catch(reason => console.warn(reason));
}