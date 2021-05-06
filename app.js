const form = document.querySelector('form');
const forcastContainer = document.querySelector('.forcast');
const weatherContainer = document.querySelector('.weather-container');
const moreInfo = document.querySelector('.more-info');
const currentBtn = document.querySelector('.current-btn');
const forcastBtn = document.querySelector('.forcast-btn');
const searchInput = document.querySelector('.search-place');
const cityName = document.querySelector('.name');
const countryName = document.querySelector('.country');
const temperature = document.querySelector('.temp');
const imgIcon = document.querySelector('img');
const text = document.querySelector('.text');
const date = document.querySelector('.bottom-right');
const time = document.querySelector('.bottom-left');
const fahrenheit = document.querySelector('.fahrenheit');
const wind = document.querySelector('.wind');
const feelLike = document.querySelector('.feel');
const humid = document.querySelector('.humidity');
const cloud = document.querySelector('.cloud');
const percipitation = document.querySelector('.percipitation');
const pressure = document.querySelector('.pressure');
const uv = document.querySelector('.uv');
const video = document.querySelector('video');

const apiKey = '40a9e5943e2a485dac2142951211904';

const weather ={};


// Display weather to UI===========================================
const displayWeather = ()=>{
    cityName.innerHTML = `${weather.city}, `;
    countryName.innerHTML = weather.country;
    temperature.innerHTML = `<i class="fas fa-thermometer-half"></i> ${weather.temperature} <span>°C</span>`;
    imgIcon.src = `http:${weather.icon}`;
    text.innerHTML = weather.description;

    let dateArr = weather.time.split(' ');
    let dateStr = dateArr[0];
    const changeDate = (dateStr) =>{
        let currentDate = new Date(dateStr);
        let fd = currentDate.toDateString();
        return fd;
    }

    date.innerHTML = `${changeDate(dateStr)}`;
    time.innerHTML = `Your local time: ${dateArr[1]}`;
    wind.innerHTML = `<i class="fas fa-wind"></i> Wind: ${weather.wind}mph`;
    fahrenheit.innerHTML =`<i class="fas fa-thermometer-half"></i> Fahrenheit: ${weather.fahrenheit} <span>°F</span>`
    feelLike.innerHTML = `<i class="fas fa-thermometer-half"></i></i> Feel like: ${weather.feelLike}°C`;
    humid.innerHTML = `<i class="fas fa-cloud-meatball"></i> Humidity: ${weather.humidity}%`;
    cloud.innerHTML = `<i class="fas fa-cloud"></i> Cloud: ${weather.cloud}%`;
    percipitation.innerHTML = `<i class="fas fa-cloud-rain"></i> Percipitation: ${weather.percipitation}″`;
    pressure.innerHTML = `<i class="fas fa-compress-arrows-alt"></i> Pressure: ${weather.pressure}″`;
    uv.innerHTML = `<i class="fas fa-sun"></i> UV INDEX: ${weather.uv}`;
}

// Display image to UI=================================================
function displayImage(){
    weather.description === 'Sunny' ? video.src =`/videos/sunny.mp4`:
    weather.description === 'Mist' ? video.src =`/videos/mist.mp4`:
    weather.description === 'Fog' ? video.src =`/videos/fog.mp4` :
    weather.description === 'Overcast' ? video.src =`/videos/overcast.mp4`:
    weather.description.includes('rain') ? video.src =`/videos/rain.mp4` :
    weather.description.includes('snow') ? video.src =`/videos/snow.mp4` :
    weather.description.includes('thunder') ? video.src =`/videos/thunder.mp4` :
    weather.description.includes('drizzle') ? video.src =`/videos/drizzle.mp4` :
    weather.description.includes('Cloudy') || weather.description.includes('cloudy')? video.src =`/videos/cloud.mp4`: video.src =`/videos/sheep.mp4`;
}



// Add event listener(weather btn)=======================================
form.addEventListener('submit',(e)=>{
    if(searchInput.value === ''){
        alert('Enter a location please!!')
    }else{
        e.preventDefault();
        const input = searchInput.value;
        weatherContainer.classList.add('show');
        moreInfo.classList.add('show');
    
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input}`)
            .then(res => res.json())
            .then(data =>{

                weather.temperature = data.current.temp_c;
                weather.city = data.location.name;
                weather.country = data.location.country;
                weather.time = data.location.localtime;
                weather.description = data.current.condition.text;
                weather.icon = data.current.condition.icon;
                // more weather info
                weather.fahrenheit = data.current.temp_f;
                weather.feelLike = data.current.feelslike_c;
                weather.humidity = data.current.humidity;
                weather.cloud = data.current.cloud;
                weather.wind = data.current.wind_mph;
                weather.percipitation = data.current.precip_in;
                weather.pressure = data.current.pressure_in;
                weather.uv = data.current.uv;

            })
            .then(()=>{
                displayWeather();
                displayImage();
                searchInput.value = '';
            })
    }
})



// Forcast Section======================================================
const fcDate1 = document.querySelector('.date1');
const condition1 = document.querySelector('.condition1');
const maxTemp1 = document.querySelector('.max-temp1');
const minTemp1 = document.querySelector('.min-temp1');
const maxWind1 = document.querySelector('.max-wind1');
const sunRise1 = document.querySelector('.sun-rise1');
const sunSet1 = document.querySelector('.sun-set1');
const perc1 = document.querySelector('.perc-fc1');
const imgIcon1 = document.querySelector('.img-icon1');

const fcDate2 = document.querySelector('.date2');
const condition2 = document.querySelector('.condition2');
const maxTemp2 = document.querySelector('.max-temp2');
const minTemp2 = document.querySelector('.min-temp2');
const maxWind2 = document.querySelector('.max-wind2');
const sunRise2 = document.querySelector('.sun-rise2');
const sunSet2 = document.querySelector('.sun-set2');
const perc2 = document.querySelector('.perc-fc2');
const imgIcon2 = document.querySelector('.img-icon2');

const fcDate3 = document.querySelector('.date3');
const condition3 = document.querySelector('.condition3');
const maxTemp3 = document.querySelector('.max-temp3');
const minTemp3 = document.querySelector('.min-temp3');
const maxWind3 = document.querySelector('.max-wind3');
const sunRise3 = document.querySelector('.sun-rise3');
const sunSet3 = document.querySelector('.sun-set3');
const perc3 = document.querySelector('.perc-fc3');
const imgIcon3 = document.querySelector('.img-icon3');


let hourArr1 = [];
let hourArr2 = [];
let hourArr3 = [];


const labels = [];
for(var i = 0; i < 24; i++){
    labels.push(i.toString());
 }

Chart.defaults.color='#5d5da2';

// chart Day1================================================
const data = {
    labels: labels,
    datasets: [{
        label: 'Hourly Forecast',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: "#55bae7",
        pointBorderColor: "#55bae7",
        data: hourArr1,
    }]
};

const config = {
    type: 'line',
    data,
    options: {
        plugins:{
            legend:{
                display:true,
                position:'top',
                labels:{
                    color:'#55bae7'
                },
            },
        }
    },
};

var chartDay1 = new Chart(document.getElementById('chart1'),config);

// chart Day 2===========================================================
const chartDay2 = document.getElementById('chart2').getContext('2d');
let lineChart2 = new Chart(chartDay2,{
    type:'line',
    data:{
        labels:labels,
        datasets:[{
            label:'Hourly Forecast',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            data:hourArr2,
        }]
    },
    options: {
        plugins:{
            legend:{
                display:true,
                position:'top',
                labels:{
                    color:'#55bae7'
                },
            },
        }
    },
    
})

// chart Day 3==============================================================
const chartDay3 = document.getElementById('chart3').getContext('2d');
let lineChart3 = new Chart(chartDay3,{
    type:'line',
    data:{
        labels:labels,
        datasets:[{
            label:'Hourly Forecast',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            data:hourArr3,
        }]
    },
    options: {
        plugins:{
            legend:{
                display:true,
                position:'top',
                labels:{
                    color:'#55bae7'
                },
            },
        },
    },
    
})



// display day1 forcast=========================
function displayDay1(forecastArr){
    fcDate1.innerHTML = `<i class="far fa-calendar-alt"></i> ${forecastArr[0].date}`;
    sunRise1.innerHTML = `<i class="fas fa-sun"></i> Sunrise: ${forecastArr[0].astro.sunrise}`;
    sunSet1.innerHTML = `<i class="fas fa-moon"></i> Sunset: ${forecastArr[0].astro.sunset}`;
    maxTemp1.innerHTML = `<i class="fas fa-temperature-high"></i> Max: ${forecastArr[0].day.maxtemp_c}<span>°C</span>`;
    minTemp1.innerHTML = `<i class="fas fa-temperature-low"></i> Min: ${forecastArr[0].day.mintemp_c}<span>°C</span>`;
    maxWind1.innerHTML = `<i class="fas fa-wind"></i> Wind: ${forecastArr[0].day.maxwind_mph}mph`;
    perc1.innerHTML = `<i class="fas fa-cloud-rain"></i> Percipitation: ${forecastArr[0].day.totalprecip_mm}mm`;
    imgIcon1.src = `http:${forecastArr[0].day.condition.icon}`;
    condition1.innerHTML= forecastArr[0].day.condition.text;

    const fcHourArr = forecastArr[0].hour;

    for(let i=0; i<fcHourArr.length; i++){
        hourArr1.push(fcHourArr[i].temp_c);
    }

    chartDay1.update();
}




// display day2 forcast=========================
function displayDay2(forecastArr){
    fcDate2.innerHTML = `<i class="far fa-calendar-alt"></i> ${forecastArr[1].date}`;
    sunRise2.innerHTML = `<i class="fas fa-sun"></i> Sunrise: ${forecastArr[1].astro.sunrise}`;
    sunSet2.innerHTML = `<i class="fas fa-moon"></i> Sunset: ${forecastArr[1].astro.sunset}`;
    maxTemp2.innerHTML = `<i class="fas fa-temperature-high"></i> Max: ${forecastArr[1].day.maxtemp_c}<span>°C</span>`;
    minTemp2.innerHTML = `<i class="fas fa-temperature-low"></i> Min: ${forecastArr[1].day.mintemp_c}<span>°C</span>`;
    maxWind2.innerHTML = `<i class="fas fa-wind"></i> Wind: ${forecastArr[1].day.maxwind_mph}mph`;
    perc2.innerHTML = `<i class="fas fa-cloud-rain"></i> Percipitation: ${forecastArr[1].day.totalprecip_mm}mm`;
    imgIcon2.src = `http:${forecastArr[1].day.condition.icon}`;
    condition2.innerHTML= forecastArr[1].day.condition.text;

    const fcHourArr = forecastArr[1].hour;

    for(let i=0; i<fcHourArr.length; i++){
        hourArr2.push(fcHourArr[i].temp_c);
    }

    lineChart2.update();
}

// display day3 forcast=========================
function displayDay3(forecastArr){
    fcDate3.innerHTML = `<i class="far fa-calendar-alt"></i> ${forecastArr[2].date}`;
    sunRise3.innerHTML = `<i class="fas fa-sun"></i> Sunrise: ${forecastArr[2].astro.sunrise}`;
    sunSet3.innerHTML = `<i class="fas fa-moon"></i> Sunset: ${forecastArr[2].astro.sunset}`;
    maxTemp3.innerHTML = `<i class="fas fa-temperature-high"></i> Max: ${forecastArr[2].day.maxtemp_c}<span>°C</span>`;
    minTemp3.innerHTML = `<i class="fas fa-temperature-low"></i> Min: ${forecastArr[2].day.mintemp_c}<span>°C</span>`;
    maxWind3.innerHTML = `<i class="fas fa-wind"></i> Wind: ${forecastArr[2].day.maxwind_mph}mph`;
    perc3.innerHTML = `<i class="fas fa-cloud-rain"></i> Percipitation: ${forecastArr[2].day.totalprecip_mm}mm`;
    imgIcon3.src = `http:${forecastArr[2].day.condition.icon}`;
    condition3.innerHTML= forecastArr[2].day.condition.text;

    const fcHourArr = forecastArr[2].hour;

    for(let i=0; i<fcHourArr.length; i++){
        hourArr3.push(fcHourArr[i].temp_c);
    }

    lineChart3.update();
}

// Fetch forcast data==========================================
forcastBtn.addEventListener('click', function(){
    if(searchInput.value === ''){
        alert('Enter a location please!!')
    }else{
        moreInfo.classList.remove('show');
        weatherContainer.classList.remove('show');
        forcastContainer.classList.add('show');
        const input = searchInput.value;
        fetch(` http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input}&days=3`)
            .then(res => res.json())
            .then(data =>{
                const forecastArr = data.forecast.forecastday;
                displayDay1(forecastArr);
                displayDay2(forecastArr);
                displayDay3(forecastArr);
                searchInput.value = '';
        })
    }
})

// refresh page==========================================
const appTitle = document.querySelector('.app-title');
appTitle.addEventListener('click',()=>{
    location.reload();
    return false;
})


            
