const rp =require("request-promise");


const getCountry = (id,city,statecode,countrycode) => {
    let options = {
        uri: "https://api.openweathermap.org/data/2.5/weather?q="+ city +","+ statecode +","+ countrycode +"&appid="+ id,
        json: true
    };
    return rp(options);   
}

const getState = (id,city,statecode) => {
    let options = {
        uri: "https://api.openweathermap.org/data/2.5/weather?q="+ city +","+ statecode +"&appid="+ id,
        json: true
    };
    return rp(options);   
}

const getCity = (id,city) => {
    let options = {
        uri: "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ id,
        json: true
    };
    return rp(options);   
}

module.exports.getCity = getCity;
module.exports.getState = getState;
module.exports.getCountry = getCountry;