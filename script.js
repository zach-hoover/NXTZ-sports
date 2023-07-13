
var playerInput = 'Erling Haaland'
var playerName = playerInput.replace(' ','%20')


const url = 'https://thesportsdb.p.rapidapi.com/searchplayers.php?p='+playerName;

fetch(url,{
    headers: {
    		'X-RapidAPI-Key': '457654d9acmsh0e511ef2135aeffp1572efjsna8ace50498fe',
		    'X-RapidAPI-Host': 'thesportsdb.p.rapidapi.com'
	}
}).then(function (response) {
        return response.json();

})

 .then(function (data) {

    console.log(data.player[0].strPosition);
    console.log(data.player[0].strDescriptionEN)

});

  const url2 = 'https://sofascores.p.rapidapi.com/v1/search/multi?group=players&query='+playerName;
  fetch(url2, {
    headers: {
      'X-RapidAPI-Key': '457654d9acmsh0e511ef2135aeffp1572efjsna8ace50498fe',
      'X-RapidAPI-Host': 'sofascores.p.rapidapi.com'
    }
  }).then(function(response) {
    return response.json();
  }).then(function(data){
    //console.log(data.data)
    //console.log(data.data[0])
    for (let i = 0; i < data.data.length; i++) {
        //console.log(data.data[i]);
        if(data.data[i].team.sport.id === 1){
            //console.log(data.data[i].name)
            //console.log(data.data[i].id)
            var league = data.data[i].team.tournament.uniqueTournament.id
            var playerid = data.data[i].id
            var urlStats= 'https://sofascores.p.rapidapi.com/v1/players/statistics/result?seasons_id=41886&player_id='+playerid+'&unique_tournament_id='+league+'&player_stat_type=overall'
            fetch(urlStats,{
                headers: {
                    'X-RapidAPI-Key': '457654d9acmsh0e511ef2135aeffp1572efjsna8ace50498fe',
		            'X-RapidAPI-Host': 'sofascores.p.rapidapi.com'

                }
            }).then(function(response) {
                return response.json()
            }).then(function(data) {
                console.log("AVG rating:"+data.data.statistics.rating)
                console.log("Goals:"+data.data.statistics.goals)
                console.log("x.G:"+data.data.statistics.expectedGoals)
                console.log("Assists:"+data.data.statistics.assists)
                console.log("Pass Percentage:"+data.data.statistics.accuratePassesPercentage+"%")
                console.log("Successful dribbles:"+data.data.statistics.successfulDribbles)
                console.log("Tackles:"+data.data.statistics.tackles)
                console.log("Interceptions:"+data.data.statistics.interceptions)
                console.log("Clearances:"+data.data.statistics.clearances)



            })
        }
        
    }
  });
  
 