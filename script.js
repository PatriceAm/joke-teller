const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const text = document.getElementById('text');

function toggleButton(){
    button.disabled=!button.disabled;
    text.style.display = 'none';
}

function tellMe(joke) {
    VoiceRSS.speech({
                key: '3cb2bc9b24ce492c815db581f3142ab5',
                src: joke,
                hl: 'en-us',
                v: 'Linda',
                r: 0, 
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });
}

async function getJokes () {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
       const response = await fetch(apiUrl);
       const data = await response.json();
       if (data.setup) {
           joke = `${data.setup} ... ${data.delivery}`;
       } else {
           joke = data.joke;
       }
       tellMe(joke);
       toggleButton();
       text.textContent = joke;
       text.style.display = 'flex'; 
    } catch (error) {
        console.log('whoops', error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
