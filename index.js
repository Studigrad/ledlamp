const express = require("express")
const app = express()
const path = require("path")
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "amascoled12w@gmail.com",
        pass: "oeugbzzotoyaokkx"
    }
  });

const port = process.env.PORT ?? 8050
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set("view engine","ejs");
app.set('views',path.join(__dirname,"/views"))

app.get("/",(req,res)=>{
    res.render("home")
})
app.post('/',(req,res)=>{
    const {name,phone} = req.body;
            const message = {
                from: "amascoled12w@gmail.com",
                to: "amascoled12w@gmail.com",
                subject: "New Order",
                text: "Имя : "+name+", Номер тел. : "+phone
        }
   
        transport.sendMail(message, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
        });
      res.redirect('/order')
})
app.get("/order",(req,res)=>{
    res.render('order')
})

app.listen(port,()=>{
    console.log("Server is listening ...")
})