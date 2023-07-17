//placeholder
var playerInput = 'Jude Bellingham'
var playerName = playerInput.replace(' ','%20')
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
var league = bundesliga
var players=[]
var season =''
var desc=''
var playerPhoto = ''
var stats=[]
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
}

const url2 = 'https://sofascores.p.rapidapi.com/v1/search/multi?group=players&query='+playerName;

  async function getid() {
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
      throw error;
    }
  }
async function generateDescription() {
  const url = 'https://thesportsdb.p.rapidapi.com/searchplayers.php?p='+playerName+'&t='+players[0].team.replace(' ','%20');
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
  })
}
async function playerCard() {
  try {
    await getid(); 
    await getstats();
    await generateDescription();
    await getphoto();
    await generateCard()


  }catch (error) {
    // Handle error if necessary
  }}
  
async function getstats() {
    
  if(players.length===1){
    var urlStats= 'https://sofascores.p.rapidapi.com/v1/players/statistics/result?seasons_id='+season+'&player_id='+players[0].id+'&unique_tournament_id='+league+'&player_stat_type=overall'
    fetch(urlStats,{
        headers: {
          'X-RapidAPI-Key': '457654d9acmsh0e511ef2135aeffp1572efjsna8ace50498fe',
          'X-RapidAPI-Host': 'sofascores.p.rapidapi.com'
          
        }
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        //console.log(data)
      stats=['Appearances:'+data.data.statistics.appearances,'Rating:'+data.data.statistics.rating,'Goals:'+data.data.statistics.goals,'x.G:'+data.data.statistics.expectedGoals,'Assists:'+data.data.statistics.assists,'x.A:'+data.data.statistics.expectedAssists,
      'Completion percentage:'+data.data.statistics.accuratePassesPercentage+'%', 'Tackles:'+data.data.statistics.tackles, 'Clearances:'+data.data.statistics.clearances ]
      console.log(stats)
      return true
  })}}

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
      console.error('Error:', error);
      throw error;
    }
  }

async function generateCard(){
const cardContainer = document.createElement('div');
cardContainer.classList.add('card', 'mb-3');
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
const descriptionEl = document.createElement('p');
descriptionEl.classList.add('card-text');
const description = document.createElement('small')
description.classList.add('text-body-secondary')
description.textContent= desc
descriptionEl.appendChild(description)

async function generatelist() {
  for (let i = 0; i < stats.length; i++) {
    const cardText = document.createElement('li');
    cardText.classList.add('card-text');
    cardText.textContent = stats[i];
    cardBody.appendChild(cardText);
  }
}

async function addCard() {
  await generatelist();
  cardBodyCol.appendChild(cardBody);
  rowContainer.appendChild(imageCol);
  rowContainer.appendChild(cardBodyCol);
  cardBody.appendChild(descriptionEl);
  cardContainer.appendChild(rowContainer);
  document.body.appendChild(cardContainer);
}

addCard();
}
playerCard()



