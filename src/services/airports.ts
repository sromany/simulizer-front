export async function getAirports(page_number: number = 1) {
    return fetch(
        `https://simulizer-back.onrender.com/airports?order=ASC&page=${page_number}&take=50`,
    ).then((v) => v.json()).catch(reason => console.warn(reason));
}