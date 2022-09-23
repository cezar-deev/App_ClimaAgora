
//Informações da API
// key : 0e0343ae7f6c8b7caade1935eeaecdab
// link : https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


// Variavesi e seleção de elementos
const apikey ="0e0343ae7f6c8b7caade1935eeaecdab";
const apiCountryURL = "https://countryflagsapi.com/png/"; // puxa a bandeira

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weartherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data") 


// Funções 
// Tenho que deixar as 2 funções como ( async await ),pois precio esperar receber as informações;

// função que acessa a API
const getWeartherData = async(city) => {

    const apiweatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br` // Com uma string dinamica (``) Aqui pego a cidade digitado no input, usando o apikey.

    const res = await fetch(apiweatherURL); // Espero o fetch ou retorno desta URL;
    const data = await res.json(); // Espero receber a inform, converto de JSON para OBJETO JS 

    //console.log(data); // Usado só para ver se a função funciona, usando o console do navegador.
    return data

}



// Função que exibe os dados da API
const showWeatherData = async (city) => {  // Função para atualizar os elementos sa tela
    //console.log(city); // Usado só para ver se a função funciona, usando o console do navegador.
    //getWeartherData(city); // Usado só para ver se a função funciona, usando o console do navegador.
    const data = await getWeartherData(city); // Executando a função que acessa a API e inserindo numa variavel [data] criada aqui mesmo

    cityElement.innerText = data.name; // Insere no elemento [cityElement] os dados da API.
    tempElement.innerText = parseInt(data.main.temp) // Insere no elemento [tempElement] os dados da API, convertendo para numero inteiro, sem virgulas.
    descElement.innerText = data.weather[0].description; // Insere no elemento [descElement] os dados da API.
    weartherIconElement.setAttribute(
        "src", 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity} %`;
    windElement.innerText = `${data.wind.speed} km/h%`;

    weatherContainer.classList.remove("hide") // Acessa as classes com ( classList) e remove a classe hide. com isso faz aparcer os intens que estavam escondidos com a class(hide) : none no css;
}


// Eventos

searchBtn.addEventListener("click", (e) => { 
    e.preventDefault();

    const city = cityInput.value; // Pegando o valor da digitado no Input
    //console.log(city); // Usado só para ver se o evento funciona, usando o console do navegador.
    showWeatherData(city); // chamando a função deita ai em cima 
});  


// Evento que pega o clique do botão Enter e executa a busca
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});    