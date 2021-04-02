const path= require('path')
const express = require('express')
const hbs=require('hbs')
const { text } = require('express')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port =process.env.PORT || 3000

const pubdir=path.join(__dirname, '../public')
const newpath=path.join(__dirname,'../templates/views') 
const partialspath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views', newpath)
hbs.registerPartials(partialspath)

app.use(express.static(pubdir))  

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Satyam'
        
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Satyam'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Satyam',
        helpText:'Help Text'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { lat, long, loc }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {

                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                loc,
                address: req.query.address
            })
        })
    
    })
})
    // res.send({
    //     forecast: 'It is sunny',
    //     location: 'Patna',
    //     address:req.query.address
    // })
app.get('/products', (req, res) => {
    console.log(req.query.search)
    if (!req.query.search) {
        return res.send({
            text:'You need to provide a search term'
        })
    }
    res.send({
        products:[]
    })
})
app.get('/help/*', (req, res) => {
    res.render('404help', {
        title: 404,
        errorText: 'Help article not found',
        name:'Satyam'
    })
})
app.get('*', (req, res) => {
    res.render('404general', {
        title: 404,
        errorText: 'Error 404 page not found',
        name:'Satyam'
        
    
})    
})


app.listen(port, ()=>{
    console.log('Server up on port ' + port)
})