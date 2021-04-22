const express = require("express");
const router = require("./routers/climate")
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(router);
app.listen(port, () =>{
    console.log(`connection is live at port no. ${port}`);
})