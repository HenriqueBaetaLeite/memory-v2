const cards = {
  react: './images/react.png',
  css: './images/css-logo.png',
  github: './images/github.png',
  html: './images/html-logo.png',
  js: './images/javascript.png',
  mongo: './images/mongodb.png',
  mysql: './images/mysql.png',
  node: './images/node.png',
  python: './images/python.png',
  redux: './images/redux-logo.png',
  rtl: './images/rtl-logo.png',
};

const cardsArray = [
  './images/react.png',
  './images/css-logo.png',
  './images/github.png',
  './images/html-logo.png',
  './images/javascript.png',
  './images/mongodb.png',
  './images/mysql.png',
  './images/node.png',
  './images/python.png',
  './images/redux-logo.png',
  './images/rtl-logo.png',
  './images/react.png',
  './images/css-logo.png',
  './images/github.png',
  './images/html-logo.png',
  './images/javascript.png',
  './images/mongodb.png',
  './images/mysql.png',
  './images/node.png',
  './images/python.png',
  './images/redux-logo.png',
  './images/rtl-logo.png',
];

const cardTrybe = './images/logo_01.png';

const boardCardsContainer = document.querySelector('.cards-container');
const btnStartGame = document.querySelector('.btn-start');

let cardsCreated = false;
let isCardFliped = false;
let pairCards = [];

// Função para embaralhar as cartas
const shuffleCards = (array) => {
  for (let index = array.length - 1; index > 0; index -= 1) {
    let j = Math.floor(Math.random() * (index + 1));
    [array[index], array[j]] = [array[j], array[index]];
  }
};

// Função para criar as divs da carta
const createCardDivs = () => {
  const cardContainer = document.createElement('div');
  const cardFront = document.createElement('div');
  const cardBack = document.createElement('div');

  cardContainer.classList.add('card');
  cardFront.classList.add('face', 'front');
  cardBack.className = 'face back';

  cardContainer.appendChild(cardFront);
  cardContainer.appendChild(cardBack);

  cardFront.addEventListener('click', flipCard);
  cardBack.addEventListener('click', flipCardReverse);

  return { cardContainer, cardFront, cardBack };
};

// Função para criar as cartas
const createCards = () => {
  // shuffleCards(cardsArray);
  if (cardsCreated) {
    return;
  }
  for (let card of cardsArray) {
    const { cardContainer, cardFront, cardBack } = createCardDivs();

    const imgFront = document.createElement('img');
    const imgBack = document.createElement('img');

    imgFront.src = cardTrybe;
    imgBack.src = card;

    cardFront.appendChild(imgFront);
    cardBack.appendChild(imgBack);

    boardCardsContainer.appendChild(cardContainer);
  }
  cardsCreated = true;
};

// "Função" para iniciar o jogo
btnStartGame.addEventListener('click', createCards);

// Função para virar a carta
const flipCard = (event) => {
  if (pairCards.length === 2) {
    return;
  }
  if (pairCards.length >= 1) {
    turnCardsBack(event.target);
  }
  const card = event.target;
  const cardSRC = getCardSrc(card);
  saveCards(cardSRC);
  console.log(pairCards);
  // console.log(cardSRC);

  if (card.src) {
    card.parentNode.style.transform = 'perspective(500px) rotateY(180deg)';
    const backFace = card.parentNode.nextSibling;
    backFace.style.transform = 'perspective(500px) rotateY(360deg)';

    return;
  }
  const cardContainer = card.parentNode;
  const frontFace = cardContainer.querySelector('.front');
  const backFace = cardContainer.querySelector('.back');

  frontFace.style.transform = 'perspective(500px) rotateY(180deg)';
  backFace.style.transform = 'perspective(500px) rotateY(360deg)';
};

// Função para desvirar a carta
const flipCardReverse = (event) => {
  cleanPairCards();

  console.log(pairCards);

  const card = event.target.parentNode;

  if (card.querySelector('.back')) {
    const backFace = card.querySelector('.back');
    const frontFace = card.querySelector('.front');
    frontFace.style.transform = '';
    backFace.style.transform = '';
    return;
  }
  const backFace = card;
  const frontFace = card.previousSibling;
  frontFace.style.transform = '';
  backFace.style.transform = '';
};

// Função para verificar se duas cartas são iguais
const verifyEqualCards = (card1, card2) => {
  if (card1 === card2) return true;
  return false;
};

// Função para "apagar" as cartas iguais e adicionar ponto ao user

// Função para desvirar as cartas automaticamente

const turnCardsBack = (card) => {
  setTimeout(() => {
    // const card = document.querySelector('.front');
    card.style.transform = '';
    console.log(card);
  }, 3000);
};

// Função para limpar o array de pares

const cleanPairCards = () => {
  pairCards.pop();
};

// Função para armazenar as cartas viradas em par
const saveCards = (card) => {
  if (pairCards.length >= 2) {
    return;
  }
  pairCards.push(card);
};

// Função que retorna a string com o nome da carta
const getCardSrc = (card) => {
  const card1 = card.parentNode.querySelector('.back');
  const card2 = card.parentNode.parentNode;

  if (card1) {
    return card1.querySelector('img').src.substr(29).slice(0, -4);
  } else {
    return card2.querySelector('.back').querySelector('img').src.substr(29).slice(0, -4);
  }
};
