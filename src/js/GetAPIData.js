// The weather API URL 
let APIURL = "https://api.open-meteo.com/v1/forecast?latitude=48.8218&longitude=2.4272&current=temperature_2m,apparent_temperature,precipitation,cloudcover&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FBerlin";
// function to get all the API data
function getAPIData() {
    
// ajax promise to get the data and then resolving the promise by returning the data
    return new Promise((resolve, reject) => {
        $.ajax({
            url: APIURL,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // This function is called when the request is successful
                resolve(data); // Resolve the promise to signal that the request is complete
            },
            // in case of error, reject with the error 
            error: function (error) {
                // This function is called if there's an error with the request
                console.error('API Request Error:', error);
                reject(error); // Reject the promise if there's an error
            }
        });
    });
}

//exporting the function
export default getAPIData;