const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express();
//define path for express config
const publicpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//set up handlebar engines and views location
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

// set up static directory to serve
app.use(express.static(publicpath))


app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Rashika Agarwal'
    });
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Rashika Agarwal'
    });
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Rashika Agarwal',

        helpText: 'this is some helpful text'
    })
})



//app.get('',(req, res)=>{
    //res.send('<h1>Weather</h1>');
//})

//app.get('/help',(req, res)=>{
    //res.send([{
       // name: 'rashika',
        //age: 20
    //}]);
//})

//app.get('/about',(req, res)=>{
    //res.send('<h1>About</h1>');
//})

app.get('/weather',(req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={} )=>{
        if(error) {
            return res.send({ error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error) {
                return res.send({ error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    //res.send({
       // forecast: "it is humid",
       // location: 'chennai',
        //address: req.query.address
    //});
})
app.get('/product',(req, res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    });
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Rashika Agarwal',
        errormessage: 'Help Article Not Found'
    });
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Rashika Agarwal',
        errormessage: 'Page Not Found'
    });
})

//app.com
//app.com/help
//app.com/about
//app.com/weather
app.listen(3000, ()=>{
    console.log('server is set on port 3000')
});
