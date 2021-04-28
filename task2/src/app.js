const express = require("express");
const redis = require("redis");
require("./db/conn");

const Availablecars = require("./models/mods");
const app = express();
const port = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);
app.use(express.json());




function cache(req,res,next){

    client.lrange("carname",0,-1,(err,data)=>{
        if (data.length!=0){
            res.send(`The available cars are ${data}`);
        } else {
            next()
        }
    });

}
app.get("/cars",cache,async(req,res)=>{
    try{
        const getCars = await Availablecars.find({"availabity":true});
        var carName ='';
        getCars.forEach((car) => {
           client.rpush("carname",car.Name);
           carName=carName+car.Name+",";   
        });
        res.send(`The available cars are ${carName}`);
        //res.send(getCars);
        
    }catch(e){
        res.status(400).send(e);     
    }
})

app.patch("/carhire/:name",async(req,res)=>{
    try{
        const name = req.params.name;
        //const getCar = await Availablecars.findOne({"Name":name})
        let carupdated = await Availablecars.findOneAndUpdate({"Name":name},{"availabity":false},{
            new: true
        });
        client.lrem("carname",0,carupdated.Name);
        res.send(`The car you have hired is ${carupdated.Name}`);
        // await Availablecars.updateOne({"Name":name},{"availabity":true});
        // await getCar.save();
        //res.send(name);
    }catch(e){
        res.status(500).send(e);     
    }
})

app.listen(port, () =>{
    console.log(`connection is live at port no. ${port}`);
})