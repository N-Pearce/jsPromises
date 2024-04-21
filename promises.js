/// Part 1
// 1.
let numbersUrl = 'http://numbersapi.com/151?json'
let promise = axios.get(numbersUrl)
promise
    .then(data => console.log(data))
    .catch(err => console.log(err))

// 2.
let ul = document.getElementById('number-facts')
numbersUrl = 'http://numbersapi.com/22..25,77?json'
promise = axios.get(numbersUrl)
promise
    .then(data => {
        for (num in data.data){
            numFact = data.data[num];
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(numFact));
            ul.appendChild(li);
        }})
    .catch(err => console.log(err))

// 3.
let ul2 = document.getElementById('fav-num')
let favNumberUrl = 'http://numbersapi.com/151?json'
let fourFavNumFacts = []
for (let i=0; i<4; i++){
    fourFavNumFacts.push(
        axios.get(favNumberUrl)
    );
}

Promise.all(fourFavNumFacts)
    .then(promiseArr => {
        // console.log(promiseArr),
        promiseArr.forEach(p => {
            numFact = p.data.text;
            li = document.createElement('li');
            li.appendChild(document.createTextNode(numFact));
            ul2.appendChild(li);
            // console.log(p.data.text)
        });
    })
    .catch(err => console.log(err));

/// Part Two
// 1. and 2.

const baseURL = 'https://deckofcardsapi.com/api/deck'

let newDeckURL = `${baseURL}/new/shuffle/?deck_count=1`
let deckId;
let drawCardURL;

promise = axios.get(newDeckURL)
promise
    .then(deck => {
        deckId = deck.data.deck_id;
        drawCardURL = `${baseURL}/${deckId}/draw/?count=1`;
        return axios.get(drawCardURL)
    })
    .then(cardPromise => {
        let card = cardPromise.data.cards[0];
        let cardVal = `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        console.log(cardVal)
        return axios.get(drawCardURL)
    }).then(cardPromise => {
        let card = cardPromise.data.cards[0];
        let cardVal = `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        console.log(cardVal)
    })
    .catch(err => console.log(err))

// 3. 
deckId = null;
$btn = $('button')
$cardArea = $('#cards')

$.getJSON(`${baseURL}/new/shuffle/`)
    .then(data => {
        deckId = data.deck_id
        $btn.show();
    })

$btn.on('click', function(){
    $.getJSON(`${baseURL}/${deckId}/draw`).then(data => {
        cardImg = data.cards[0].image;
        let angle = Math.random() * 60 - 30;
        let randomX = Math.random() * 20 - 10;
        let randomY = Math.random() * 20 - 10;
        $cardArea.append(
            $('<img>', {
                src: cardImg,
                css: {
                    position: 'absolute',
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (data.remaining === 0) $btn.hide()
    });
});

