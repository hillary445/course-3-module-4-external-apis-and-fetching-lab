// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

function fetchWeatherAlerts(state) {
    
       const errorDiv = document.getElementById("error-message")
        const alertsDiv = document.getElementById("alerts-display")
    
    if (!state) {
        errorDiv.textContent = "Please enter a state code."
        errorDiv.classList.remove("hidden")
        alertsDiv.innerHTML = ""
        return
    }
    
    fetch(`${weatherApi}${state}`)
    .then(response => { 
            if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)}
            return response.json()
        })
    .then(data =>{
         document.getElementById("state-input").value = ""
            errorDiv.textContent = ""
            errorDiv.classList.add("hidden")
         displayAlerts(data)
        })
    .catch(error => {
            errorDiv.textContent = error.message
            errorDiv.classList.remove("hidden")
            alertsDiv.innerHTML = ""
        })

}

function displayAlerts(data) {
    const alertsContainer = document.getElementById("alerts-display")

    alertsContainer.innerHTML = ""

    const alertCount = data.features.length

    const summary = document.createElement("p")
    summary.textContent = `${data.title}: ${alertCount}`
    alertsContainer.appendChild(summary)

    const ul = document.createElement("ul")

    data.features.forEach(alert => {
        const li = document.createElement("li")
        li.textContent = alert.properties.headline
        ul.appendChild(li)
    })

    alertsContainer.appendChild(ul)
}

document.getElementById("fetch-alerts").addEventListener("click", () => {
    const state = document.getElementById("state-input").value.trim().toUpperCase()
    fetchWeatherAlerts(state)
})

    