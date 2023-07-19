//placeholder
var playerInput = ''
var playerName = ''
 var prem ='17'
var laLiga= '8'
 var Ligue1= '34'
 var bundesliga='35'
var eredevise= '37'
var belgianProLeague='38'
var mls= '242'
var ligaMX= '11621'
var brasileiro= '325'
var championship= '18'
var saudiProleague= '955'
// var leagues= ["17", "8", "34", "35","37","38", "242", "11621", "325", "18", "955"]
let cardContainer;
let descriptionEl;

var league = ''
var btns=document.querySelectorAll(".dropdown-item")
for (let i = 0; i < btns.length; i++) {
  // var value=leaguesEl[i].dataset.type
  btns[i].addEventListener("click", 
  function leaguebtn (event){league=event.target.dataset.type
  console.log(event.target)
  console.log(league)}
  )


  
}
var players=[]
var season =''
var desc=''
var playerPhoto = ''
var stats=[]
//uses the league that is chosen to choose which season to use 
//without a league or season value the fecth will not work



async function getid() {
    const url2 = 'https://sofascores.p.rapidapi.com/v1/search/multi?group=players&query='+playerName;
    try {
      const response = await fetch(url2, {
        headers: {
          'X-RapidAPI-Key': '457654d9acmsh0e511ef2135aeffp1572efjsna8ace50498fe',
          'X-RapidAPI-Host': 'sofascores.p.rapidapi.com'
        }
      });
  
      const data = await response.json();
      //console.log(data.data[0])
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].team.sport.id === 1) {
          var player = {
            id: data.data[i].id,
            name: data.data[i].name,
            position: data.data[i].position,
            team: data.data[i].team.name
          };
  
          players.push(player);
          //console.log(players[0].team.replace(' ','%20'))
        }
      }
  
      return true;
    } catch (error) {
      console.error('Error:', error);
      location.reload();
    }
  }
async function generateDescription() {
  const url = 'https://thesportsdb.p.rapidapi.com/searchplayers.php?p='+playerName
  fetch(url,{
  headers: {
    'X-RapidAPI-Key': '457654d9acmsh0e511ef2135aeffp1572efjsna8ace50498fe',
    'X-RapidAPI-Host': 'thesportsdb.p.rapidapi.com'
    }
  }).then(function(response) {
    return response.json()
  }).then(function(data) {
    //console.log(data)
    desc= data.player[0].strDescriptionEN
    console.log(desc)
    return true
  }) .catch(function (error) {
    console.error('Error:', error);
    if(descriptionEl){
      descriptionEl.remove()
    };
  });
}
async function playerCard() {
  try {
    await getid(); 
    await Promise.all([generateDescription(), getstats(), await getphoto()]);
    if(stats.length>0){
      generateCard()}else{console.log("error")}


  }catch (error) {
    // Handle error if necessary
  }}
  
  async function getstats() {
    return new Promise((resolve, reject) => {
      var urlStats =
        'https://sofascores.p.rapidapi.com/v1/players/statistics/result?seasons_id=' +
        season +
        '&player_id=' +
        players[0].id +
        '&unique_tournament_id=' +
        league +
        '&player_stat_type=overall';
      fetch(urlStats, {
        headers: {
          'X-RapidAPI-Key': '457654d9acmsh0e511ef2135aeffp1572efjsna8ace50498fe',
          'X-RapidAPI-Host': 'sofascores.p.rapidapi.com',
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (
            league === '37' ||
            league === '38' ||
            league === '11621' ||
            league === '18' ||
            league === '955' ||
            league === '242'
          ) {
            stats = [
              'Appearances:' + data.data.statistics.appearances,
              'Rating:' + data.data.statistics.rating.toFixed(2),
              'Goals:' + data.data.statistics.goals,
              'Assists:' + data.data.statistics.assists,
              'Completion percentage:' +
                data.data.statistics.accuratePassesPercentage.toFixed(2) +
                '%',
              'Tackles:' + data.data.statistics.tackles,
              'Clearances:' + data.data.statistics.clearances,
            ];
          } else {
            stats = [
              'Appearances:' + data.data.statistics.appearances,
              'Rating:' + data.data.statistics.rating.toFixed(2),
              'Goals:' + data.data.statistics.goals,
              'x.G:' + data.data.statistics.expectedGoals.toFixed(2),
              'Assists:' + data.data.statistics.assists,
              'x.A:' + data.data.statistics.expectedAssists.toFixed(2),
              'Completion percentage:' +
                data.data.statistics.accuratePassesPercentage.toFixed(2) +
                '%',
              'Tackles:' + data.data.statistics.tackles,
              'Clearances:' + data.data.statistics.clearances,
            ];
          }
  
          console.log(stats);
          resolve(stats);
        })
        .catch(function (error) {
          console.error('Error:', error);
          reject(error);
        });
    });
  }

async function getphoto() {
    const urlPhoto = 'https://sofascores.p.rapidapi.com/v1/players/photo?player_id=' + players[0].id;
    try {
      const response = await fetch(urlPhoto, {
        headers: {
          'X-RapidAPI-Key': '457654d9acmsh0e511ef2135aeffp1572efjsna8ace50498fe',
          'X-RapidAPI-Host': 'sofascores.p.rapidapi.com'
        }
      });
  
      if (response.ok) {
        const blob = await response.blob();
        playerPhoto = URL.createObjectURL(blob);
      } else {
        throw new Error('Error fetching player photo: ' + response.status);
      }
    } catch (error) {
      location.reload();
      return false;
    }
  }

async function generateCard(){
  if(cardContainer){
    cardContainer.remove()
  }
cardContainer = document.createElement('div');
cardContainer.classList.add('card', 'mb-3',"cardCenter");
cardContainer.style.maxWidth = '540px';
const rowContainer = document.createElement('div');
rowContainer.classList.add('row', 'g-0');
const imageCol = document.createElement('div');
imageCol.classList.add('col-md-4');
const image = document.createElement('img');
image.src = playerPhoto; 
image.classList.add('img-fluid', 'rounded-start');
image.alt = players[0].name; 
imageCol.appendChild(image);
const cardBodyCol = document.createElement('div');
cardBodyCol.classList.add('col-md-8');
const cardBody = document.createElement('div');
cardBody.classList.add('card-body');
const cardTitle = document.createElement('h5');
cardTitle.classList.add('card-title');
cardTitle.textContent = players[0].name;
if(desc){descriptionEl = document.createElement('p');
descriptionEl.classList.add('card-text');
const description = document.createElement('small')
description.classList.add('text-body-secondary')
description.textContent= desc
descriptionEl.appendChild(description)}

async function generatelist() {
  return new Promise((resolve) => {
    //console.log('inside generate list')
    //console.log('stats length',stats.length)
    // Clear the previous list items
    while (cardBody.firstChild) {
      cardBody.firstChild.remove();
    }
    
    if (stats.length>0) {
      console.log('generate items')
      for (let i = 0; i < stats.length; i++) {
        const cardText = document.createElement('li');
        cardText.classList.add('card-text');
        cardText.textContent = stats[i];
        cardBody.appendChild(cardText);
      }
      resolve();
    }else{console.log("no stats")}
      // Generate new list items
  });
}

async function addCard() {
  await generatelist();
  cardBodyCol.appendChild(cardBody);
  rowContainer.appendChild(imageCol);
  rowContainer.appendChild(cardBodyCol);
  if(descriptionEl){
  cardBody.appendChild(descriptionEl);}
  cardContainer.appendChild(rowContainer);
  document.body.appendChild(cardContainer);
}
await generatelist()
addCard();
}
// playerCard()


var userInput = document.querySelector("input")
var userSearch = document.querySelector("form")
userSearch.addEventListener("submit", function(event){
  event.preventDefault();
  players=[]
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
    $('#exampleModal').modal('show')
    return false
    //change to bootstrap modal at later date
  }
  console.log(season)
  console.log(userInput.value)
  playerInput = userInput.value
  playerName=playerInput.replace(' ','%20')
  playerCard()
})