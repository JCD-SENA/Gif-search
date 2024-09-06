const key = "QDzBUZ3JgJ9O5gye64L6L5Sd4CA0mCnm"
const url_trend = "https://api.giphy.com/v1/gifs/trending?api_key="+key
const url_search = "https://api.giphy.com/v1/gifs/search?api_key="+key+"&q="
const cardsContainer = document.getElementById("cards")
const characterSearch = document.getElementById("character-search")

const makeGif = (gif) => {
	let gifInfo = gif.images.original
	console.log(gifInfo)
	const container = document.createElement("div")
	const imgGif = document.createElement("img")

	container.className = "card"
	imgGif.src = gifInfo.url

	container.appendChild(imgGif)
	cardsContainer.appendChild(container)
}

const render = (gifs) => {
	cardsContainer.innerHTML = ""
	gifs.forEach(gif => {
		makeGif(gif)
	})
}

const getGifs = async (url) => {
	let query = url+"&limit=14"
	try {
		const response = await fetch(query)
		const data = await response.json()
		render(data.data)
	} catch (error) {
		cardsContainer.innerHTML = "La API no respondió."
	}
}

window.addEventListener("DOMContentLoaded", () => getGifs(url_trend))
characterSearch.addEventListener("keyup", async (e) => {
	if (e.target.value.length > 0)
		getGifs(url_search+e.target.value)
	else
		getGifs(url_trend)
})