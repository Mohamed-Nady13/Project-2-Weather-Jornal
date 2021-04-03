/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = "e739516ac81ed980cc7511954ada8827";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate")
    .addEventListener("click", generateHandler);

/* Function called by event listener */
function generateHandler() {
    const zipCode = document.querySelector("#zip").value;
    if (zipCode) {
        getWeatherData(zipCode)
            .then(saveData)
            .then(getData);
    } else {
        alert("Input Correct Data")
    }
}

/* Function to GET Web API Data*/

async function getWeatherData(zipCode) {
    const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`);
    try {
        const data = await request.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
/* Function to POST data */
async function saveData(weatherData) {
    console.log("Save Data");

    const data = {
        temp: weatherData.main.temp,
        feelings: document.querySelector("#feelings").value,
        date: newDate
    };
    const request =
        await fetch("/savedata", {
            "method": "POST",
            "credentials": "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)

        });
    return;
    // try {
    //     const data = request.json();
    //     console.log(data);
    // } catch (error) {
    //     console.log(error);
    // }
}

/* Function to GET Project Data */
async function getData() {
    const request = await fetch("/getdata");
    try {
        const data = await request.json();
        document.querySelector("#date").textContent = data.date;
        document.querySelector("#temp").textContent = data.temp;
        document.querySelector("#content").textContent = data.feelings;

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}