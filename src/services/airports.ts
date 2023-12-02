export async function getAirports() {
    return fetch(
        "https://simulizer-back.onrender.com/airports?order=ASC&page=1&take=50",
    ).then((v) => v.json()).catch(reason => console.warn(reason));
}