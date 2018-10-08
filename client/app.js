const charactersElemnt = document.querySelector('.characters');
const thanosElement = document.querySelector('#thanos');

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

const hiddenCharacters = {
  1009652 : true,
  1009165: true,
  1009726: true,
  1009299: true
}

function addCharactersToPage(characterData){
  //console.log(characterData.data.results);
  characterData.data.results.forEach(result => {
    if(!hiddenCharacters[result.id]){
      //console.log(result.thumbnail.path + '/standard_medium.jpg');
      const characterImage = result.thumbnail.path + '/standard_medium.jpg';
      const characterElemnt = document.createElement('div');
      characterElemnt.style.transform = 'scale(1)';
      characterElemnt.className = 'character';

      const imageElement = document.createElement('img');
      imageElement.src = characterImage;

      characterElemnt.appendChild(imageElement);

      const characterName = result.name.replace(/\(.*\)/, '');
      const characterNameElement = document.createElement('h3');
      characterNameElement.textContent = characterName;

      characterElemnt.appendChild(characterNameElement);

      charactersElemnt.appendChild(characterElemnt);
    }
  });
}

getCharacterData()
  .then(addCharactersToPage);


thanosElement.addEventListener('click', () => {
  setTimeout(() => {
    balanceUniverse();
  },2000);
});


function balanceUniverse(){
  const characters = [...document.querySelectorAll('.character')];

  let leftToDie = Math.floor(characters.length / 2);

  kill(characters, leftToDie);
}

function kill(characters, leftToDie){
  if(leftToDie > 0){
    //do the killing
    const randomIndex = Math.floor(Math.random() * characters.length);
    const [characterChosen] = characters.splice(randomIndex, 1);
    characterChosen.style.transform = 'scale(0)';
    characterChosen.classList.remove('alive');
    characterChosen.classList.add('dead');

    setTimeout(() => {
      kill(characters, leftToDie - 1);
    }, 1000)
  }else{
    document.querySelectorAll('.dead').forEach(character => {
      character.style.height = '0px';
      character.style.width = '0px';
    });
  }
}