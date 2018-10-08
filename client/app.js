const charactersURL = 'https://gateway.marvel.com:443/v1/public/events/29/characters?limit=100&apikey=63536fc3fd34892b6fc1c44c5ca69989';

function getCharacterData(){
  if(localStorage.characterData){
    return Promise.resolve(JSON.parse(localStorage.characterData));
  }
  return fetch(charactersURL)
  .then(response => response.json())
  .then(data => {
    localStorage.characterData = JSON.stringify(data);
    return data;
  });
}

function addCharactersToPage(characterData){
  //console.log(characterData.data.results);
  characterData.data.results.forEach(result => {
    console.log(result.thumbnail.path + '/standard_medium.jpg');
    const characterImage = result.thumbnail.path + '/standard_medium.jpg';
  });
}

getCharacterData()
  .then(addCharactersToPage);