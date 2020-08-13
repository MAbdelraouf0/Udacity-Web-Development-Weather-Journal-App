/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

window.onload = async function(){

    var data = await getMostRecentData();

    if (data.temp) {
        updateMostRecentSection(data);
    }


    document.getElementById('generate').addEventListener('click', async function() {
        
        let zipCode = document.getElementById('zip').value;
        let feelings = document.getElementById('feelings').value;
    
        const data = await getOpenWeatherMapData(zipCode, feelings);

        await sendDateToServer(data);

        updateMostRecentSection(data);
    })
}

async function getMostRecentData() {
    return await fetch(`/projectData`)
        .then(res => res.json());
}

function updateMostRecentSection(data) {
    let date = document.getElementById('date');
    let temp = document.getElementById('temp');
    let content = document.getElementById('content');

    date.innerHTML = data.date;
    temp.innerHTML = data.temp;
    content.innerHTML = data.content;
}

async function sendDateToServer(data) {
    return await fetch(`/projectData`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    })
        .then(res => res.json());
}

async function getOpenWeatherMapData(zipCode, feelings) {
    var openWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=a8eabdad0f9fe6af68276b06343f261e`)
        .then(res => res.json());

    const data = {
        temp: openWeatherResponse.main.temp,
        date: newDate,
        content: feelings
    };
    return data;
}

