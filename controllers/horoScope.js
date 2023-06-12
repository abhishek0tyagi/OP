const axios = require('axios');
var request = require('request');

const matchmakingScore = async function(req,res)
{
    const {maleDetails,femaleDetails}=req.body;
    var options = {
      'method': 'POST',
      'url': 'https://json.freeastrologyapi.com/match-making/ashtakoot-score',
      'headers': {
        'Content-Type': 'application/json',
        'x-api-key': 'jRIleUxv9V50YhromzGUp8aYMYFl0uZj11NskprW'
      },
      body: JSON.stringify({
        "female": {
          "year": femaleDetails.year,
          "month": femaleDetails.month,
          "date": femaleDetails.date,
          "hours": femaleDetails.hours,
          "minutes": femaleDetails.minutes,
          "seconds": 0,
          "latitude": 16.16667,
          "longitude": 81.1333,
          "timezone": 5.5
        },
        "male": {
            "year": maleDetails.year,
            "month": maleDetails.month,
            "date": maleDetails.date,
            "hours": maleDetails.hours,
            "minutes": maleDetails.minutes,
            "seconds": 0,
            "latitude": 16.16667,
            "longitude": 81.1333,
            "timezone": 5.5
          },
        "config": {
          "observation_point": "topocentric",
          "language": "en",
          "ayanamsha": "lahiri"
        }
      })
    
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      res.send(response.body)
    });
}


const charts =async function(req,res)
{

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'https://json.freeastrologyapi.com/horoscope-chart-url',
      'headers': {
        'Content-Type': 'application/json',
        'x-api-key': 'jRIleUxv9V50YhromzGUp8aYMYFl0uZj11NskprW'
      },
      body: JSON.stringify({
        "year": 2022,
        "month": 8,
        "date": 11,
        "hours": 6,
        "minutes": 0,
        "seconds": 0,
        "latitude": 17.38333,
        "longitude": 78.4666,
        "timezone": 5.5,
        "config": {
          "observation_point": "topocentric",
          "ayanamsha": "lahiri"
        }
      })
    
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
    res.send(response.body)
    });
    
}
module.exports={matchmakingScore,charts}