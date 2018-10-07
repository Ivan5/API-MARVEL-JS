const charactersURL = 'https://gateway.marvel.com:443/v1/public/events/29/characters?limit=100&apikey=63536fc3fd34892b6fc1c44c5ca69989';

fetch(charactersURL)
  .then(response => response.json())
  .then(data => {
    console.log(data.data.results);
  })