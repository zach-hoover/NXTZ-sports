//placeholder
var playerInput = 'Jude Bellingham'
var playerName = playerInput.replace(' ','%20')
//placeholder
var league = bundesliga
//codes needed for fetch request 
//create buttons to assign these values to league variable
var prem =17
var laLiga= 8
var Ligue1= 34
var bundesliga=35
var eredevise= 37
var belgianProLeague=38
var mls= 242
var ligaMX= 11621
var brasileiro= 325
var championship=18
var saudiProleague= 955
//fetches a description, positon, and current team rn, might reasign position to be drawn from sofascore later
//create for loop to iterate through all players in array
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
    console.log(data.player[0].strTeam)
    console.log(data.player[0].strPosition);
    console.log(data.player[0].strDescriptionEN)

});
//first fetch uses a string to find the players unique sofascore id
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
    //iterates through every player with same name
    for (let i = 0; i < data.data.length; i++) {
        //console.log(data.data[i]);
        //filters for soccer players as sofa score tracks data for bunch of sports
        if(data.data[i].team.sport.id === 1){
            //console.log(data.data[i].name)
            console.log(data.data[i].id)
            var season =''
            //uses the league that is chosen to choose which season to use 
            //without a league or season value the fecth will not work
            if(league===laLiga){
              season = '42409'
            }else if (league===prem) {
              season= '41886'
            } else if (league===saudiProleague){
              season='44908'
            }else if (league===Ligue1){
              season='42273'
            }else if (league===bundesliga){
              season='42268'
            }else if (league===eredevise){
              season='42256'
            }else if(league===belgianProLeague){
              season='42404'
            }else if(league===mls){
              season='47955'
            }else if(league===ligaMX){
              season='52052'
            }else if(league===brasileiro){
              season='48982'
            }else if (league===championship){
              season='42401'
            }else{
              //error message if no league is chosen
              //change to bootstrap modal at later date
              window.prompt('please select a league')
            }
            //retrieves unique player id from initial fetch
            var playerid = data.data[i].id
            //sends second fetch using the unique id number to pull player statistics from sofascore
            //this is necessary because sofa score will not give you any statistics or really any relevant data on a player via the query where you search their name
            var urlStats= 'https://sofascores.p.rapidapi.com/v1/players/statistics/result?seasons_id='+season+'&player_id='+playerid+'&unique_tournament_id='+league+'&player_stat_type=overall'
            fetch(urlStats,{
                headers: {
                    'X-RapidAPI-Key': '457654d9acmsh0e511ef2135aeffp1572efjsna8ace50498fe',
		            'X-RapidAPI-Host': 'sofascores.p.rapidapi.com'

                }
            }).then(function(response) {
                return response.json()
            }).then(function(data) {
              //the most pertinent statistics i feel for filling out a player profile, this isn't even a fraction of all the stuff sofascore sends out
              // i might add a few more like tackle percentage, successful dribble percentage
              // will definately add appearances and an if statement for goalies to show the relevant goaltending stats
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
  
 