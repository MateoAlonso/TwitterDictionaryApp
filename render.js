const btnSearch = document.getElementById("btnSearch");
const btnToken = document.getElementById("btnToken");
btnSearch.onclick = function () {getResponse()};
btnToken.onclick = function () {updateToken()}
const endpointUrlTwitter = "https://api.twitter.com/2/tweets/search/recent?query=";
const endpointUrlDicc = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var bearerToken = "";

async function getResponse() {
    let inputSearch = document.getElementById("inputSearch").value;
    const twitterParams = endpointUrlTwitter + encodeURIComponent("lang:en -is:retweet -is:reply -is:quote -has:media - has:links -has:mentions " + inputSearch);
    const diccParams= endpointUrlDicc + inputSearch;
    
    console.log(inputSearch);

    //Dicc response

    const diccResponse = await fetch(diccParams).catch((error) => {
        console.log(error);
    });;
    const jsonResponseDicc = await diccResponse.json();
    constructDiccList(jsonResponseDicc);


    //Twitter response

    const twitterResponse = await fetch(twitterParams,{method: "GET", headers: {'Authorization': 'Bearer ' + bearerToken}}).catch((error) => {
        console.log(error);
    });
    const jsonResponseTwitter = await twitterResponse.json();
    constructTwitterList(jsonResponseTwitter);
    
}

function updateToken() {
    bearerToken = document.getElementById("bearerToken").value;
    document.getElementById("bearerToken").value = '';
}

function constructDiccList(jsonData) {
    let inputSearch = document.getElementById("inputSearch").value;
    document.getElementById("diccContentTitle").textContent = "Definitions for " + inputSearch;
    let ul = document.getElementById("diccContent");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    jsonData.forEach(element => {
        element.meanings.forEach(meaning => {
            meaning.definitions.forEach(definition => {
                console.log(definition)
                let newLiItem = document.createElement("li");
                newLiItem.textContent = definition.definition;
                newLiItem.classList.add("list-group-item", "m-3");
                ul.appendChild(newLiItem);
            });
        });
    });
}

function constructTwitterList(jsonData) {
    let inputSearch = document.getElementById("inputSearch").value;
    document.getElementById("twitterContentTitle").textContent = "Tweets containing " + inputSearch;
    let ul = document.getElementById("twitterContent");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    jsonData.data.forEach(element => {
        let newLiItem = document.createElement("li");
        newLiItem.textContent = element.text;
        newLiItem.classList.add("list-group-item", "m-3");
        ul.appendChild(newLiItem);
        console.log(element.text);
    });

}