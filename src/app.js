const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicDir_Path = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir_Path))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Rishabh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Rishabh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Rishabh'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please enter address",
        });

    }

    var address = req.query.address;
    geocode.geocode(address,(error,{latitude, longitutde, location}={})=>{
        if(error){
            console.log('Error',error)
            res.send({
                location:address,
                error,
                address: address
            })
        }else{
            forecast.forecast(latitude, longitutde,(error,data1)=>{
                if(error){
                    console.log('Error',error)
                    res.send({
                        location:address,
                        error,
                        address: address
                    })
                }else{
                    console.log(location + ' Temprture is '+data1)  
                    res.send({
                        location:address,
                        forecast:location + ' Temprture is '+data1,
                        address: address
                    })
                     
                }
            
            })
        }
    })

   
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:'Help article not found',
        name:'Rishabh'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        message:'my 404 page',
        name:'Rishabh'
    })
})

app.listen(port,()=>{
    console.log("server is up on "+port+" port")
})