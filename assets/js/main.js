const display = document.querySelector('.display');
function react(){
    return `
    <span class="error"></span>
    <span class="insert-city"></span>
    <span class="insert-country"></span>
    <span class="insert-wind"></span>
    <span class="insert-temp max"></span>
    <span class="insert-temp min"></span>
    <span class="insert-hum"></span>
    <span class="insert-pressure"></span>
    <span class="insert-lat"></span>
    <span class="insert-lon"></span>
    <div class="btn-map"><button id="acess-map">Acessar Mapa</button></div>
    `
};
display.innerHTML = react();
const 
    form = document.querySelector("#form-input"),
    insertTemperature = document.querySelector('.insert-temperature'),
    btnMap = document.querySelector('.btn-map'),
    error = document.querySelector('.error'),
    inputDisplay = document.querySelector('.input-display'),
    loader = document.querySelector('.loader'),
    input = document.querySelector('#inputSearch'),
    errorInput = document.querySelector('.error-message'),
    all = document.querySelectorAll('.display span'),
    searchFloat = document.querySelector('.float'),
    key = 'd9868234df657848f0c6e9930f3c1de9';

let cityInvalid = 'Por favor insira uma cidade válida 😩';



(function(){
    insertTemperature.style.display = 'none';
    errorInput.style.display = 'none';
    error.style.display = 'none';
})();

searchFloat.addEventListener('click', ()=>{
    document.location.reload(true)
});

function afterSearch(){
    if(!input.value == ''){
        inputDisplay.style.display = 'none';
        loader.style.display = 'flex';
        setTimeout(()=>{
            loader.style.display = 'none';
            display.style.display = 'flex';
            insertTemperature.style.display = '';
        }, 1500)
    }else errorInput.innerText = cityInvalid;
    setTimeout(()=>{errorInput.innerText = ''}, 4000)
}
form.addEventListener('submit', e=>{
    e.preventDefault();
    const inputValue = input.value;
    
    //
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`;
    fetch(url).then(response=> response.json()).then(data=>{
        const accessMap = document.querySelector('#acess-map');
        const { coord, main, name, sys, weather } = data;
        //
        insertTemperature.innerText = `${Math.round(main.temp)} ºC`;
        all[1].innerText = name;
        all[2].innerText = sys.country; 
        all[3].innerHTML = `Nuvens: ${weather[0].description}<i class="img-insert"><img src="https://img.icons8.com/nolan/96/clouds.png"/></i>`
        all[4].innerText = `Temperatura máx: ${main.temp_max} ºC`;
        all[5].innerText = `Temperatura min: ${main.temp_min} ºC`;
        all[6].innerHTML = `Umidade : ${main.humidity}<i class="img-insert"><img src="https://img.icons8.com/office/100/000000/moisture.png"/></i>`
        all[7].innerText = `Pressão : ${main.pressure} hPa`;
        all[8].innerText = `Latitude : ${coord.lat}`;
        all[9].innerText = `Longitude : ${coord.lon}`;
        //
        accessMap.addEventListener('click', ()=>{
            window.location.assign(`https://www.openstreetmap.org/#map=15/${coord.lat}/${coord.lon}`)
        })
    }).catch((er)=>{
        btnMap.style.display = 'none';
        error.style.display = '';
        error.innerText = cityInvalid;
    });


    afterSearch();
})