const URL = 'https://simulizer-back.onrender.com'

export async function getAirports(page_number: number = 1) {
    return fetch(
        `${URL}/airports?order=ASC&page=${page_number}&take=50`,
    ).then((v) => v.json()).catch(reason => console.warn(reason));
}

export async function getairportConnections(page_number: number = 1) {
    return fetch(
        `${URL}/airportConnections?order=ASC&page=${page_number}&take=10`,
    ).then((v) => v.json()).catch(reason => console.warn(reason));
}