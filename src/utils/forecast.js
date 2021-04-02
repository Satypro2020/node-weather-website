const request=require('request')
const forecast=(lat, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=31c01c2223da11b7b73d1f21e7aebed0&query='+ encodeURIComponent(lat)+','+encodeURIComponent(long)
    request({url,json:true}, (error,{body} = {})=>{
        if (error){
            callback('Unable to connect to weather servive',undefined)
        }
        
        else if(body.error){
            callback('Unable to find location!!',undefined)
        }
        else{
            callback(undefined,  body.current.weather_descriptions[0] + ' and the temperature is ' + body.current.temperature + '.')
           
        }

    } )
        
}
/*forecast('25.5941', '85.1376', (error, data) => {
    console.log('Error', error)
    console.log('Data',data)
})*/

module.exports=forecast