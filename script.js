//JKVziK7ZrhGL0f7ocCNZiiUAWxzCHm_LW_-de8XWG8Q

const apiKey = "9c88d20c1e9987653b94c8cc4976eb15";
const apiCountryURL = "https://countryflagsapi.com/png/";

console.log(apiCountryURL)

//mapear elementos

const cityInput = document.querySelector('#pesq');
const searchBTN = document.querySelector('#btn-pesq');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const countryElement = document.querySelector('#country');
const weatherIconElement = document.querySelector('#weather-icon');
const umidityElement = document.querySelector('#umidity span');
const windElemnt = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');

//eventos
searchBTN.addEventListener("click", (e) =>{

    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(cityInput.value);

})

//funções
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    //tratando erro
    const res = await fetch(apiWeatherURL).then(response =>{
        if(!response.ok){ //se a resposta não for ok
            throw Error(response.statusText); //força um erro
        }
        return response; //retorna a resposta
    })
    .catch(e => alert('Digite uma cidade válida')) //cai no catch com o erro

    const data = await res.json();
    
    return data;

}

const showWeatherData = async (city) => {

    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    windElemnt.innerText = `${data.wind.speed}km/h`;
    weatherIconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    umidityElement.innerText = `${data.main.humidity}%`

    weatherContainer.classList.remove('hide');

}

cityInput.addEventListener('keyup', (e) => {

    if (e.code == 'Enter'){
        const city = e.target.value;

        showWeatherData(city);
    }
})
