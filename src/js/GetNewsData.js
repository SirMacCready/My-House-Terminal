// function to get the News data from the API
function getNewsData() {
    //API URL 
    var url = 'https://newsapi.org/v2/top-headlines?' +
              'country=fr&' +
              'apiKey=9423b3ae7d2b4b57b47dfd2cd796788a';
    var req = new Request(url);

    // Return the result of the fetch call, which is a promise that resolves to the JSON data
    return fetch(req)
        .then(function(response) {
            return response.json();
        });
}

export default getNewsData;
