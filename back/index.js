const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const fs = require('fs')
const csv=require('csvtojson')

const app = express()
app.use(cors())

const MAX_NR = 20
const API_URL = 'https://api.openaq.org/v1'
const csvFilePath='./data.csv'

app.get('/air-info', (req, res) => {
    const country = req.param('country') || 'US'

    fetch(`${API_URL}/latest?&country=${country}&order_by[]=measurements[0].value&sort[]=desc&limit=${MAX_NR}&has_geo=true`)
    .then(response => response.json())
    .then(data => {
        let arr = []
        let i = 0;
        for (let result of data.results) {
            result.measurements.forEach(measure => {
            if(measure.value>0){
                if(!((result.location===data.results[i].location) && 
                    (result.measurements[0].value === data.results[i].measurements[0].value) &&
                        (result.measurements[0].parameter === data.results[i].measurements[0].parameter)) ){
            let obj = {}
            obj.long = result.coordinates.longitude
            obj.lat = result.coordinates.latitude
            obj.city = result.city
            obj.location = result.location
            obj.element = result.measurements[0].parameter
            obj.value = result.measurements[0].value
            if (result.measurements[0].averagingPeriod === undefined) {
                obj.period = null
            } else {
                obj.period = {}
                obj.period.unit = result.measurements[0].averagingPeriod.unit
                obj.period.value = result.measurements[0].averagingPeriod.value
            }
            arr.push(obj);
            i++;
            }
            }
        });
        }

        res.json(arr)

    })
})

app.get('/countries', (req, res) => {
    fetch(`${API_URL}/countries`)
    .then(response => response.json())
    .then(data => {
        let arr = []
        
        for (let result of data.results) {
            let obj = {}
            if (result.code === 'VN')
                result.name = 'Vietnam'

            if (result.code !== undefined && result.name !== undefined) {
                obj.code = result.code
                obj.name = result.name
                arr.push(obj)
            }
        }

        res.json(arr)
    })
})

app.get('/polluants', (req, res) => {
    fs.readFile('./particles.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }

        const customer = JSON.parse(jsonString)
        res.json(customer)
    })
})


app.get('/ml', (req, res) => {
    csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    res.json(jsonObj)
})
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log('Server is up and listening on port ' + PORT)
})