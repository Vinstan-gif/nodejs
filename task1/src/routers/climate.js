const express = require("express");
const router = new express.Router();
const clifunc = require("../func/climatefunc");

router.get('/weather/city/:city&:id',async(req,res)=> {
    
    const id = req.params.id;
    const city =req.params.city;
    clifunc.getCity(id,city)
    .then((data)=>{
        res.send(data);
        console.log("got city weather data");
    }).catch((err)=>{
        res.status(400);
        res.json(err);
    });
       
});

router.get('/weather/statecode/:city&:statecode&:id',async(req,res)=>{
    const id = req.params.id;
    const city =req.params.city;
    const statecode =req.params.statecode;
    clifunc.getState(id,city,statecode)
    .then((data)=>{
        res.send(data);
        console.log("got state weather data");
    }).catch((err)=>{
        res.status(400);
        res.json(err);
    });
});

router.get('/weather/countrycode/:city&:statecode&:countrycode&:id',async(req,res)=>{
    const id = req.params.id;
    const city =req.params.city;
    const statecode =req.params.statecode;
    const countrycode=req.params.countrycode;
    clifunc.getCountry(id,city,statecode,countrycode)
    .then((data)=>{
        res.send(data);
        console.log("got country weather data");
    }).catch((err)=>{
        res.status(400);
        res.json(err);
    });
});

module.exports = router;