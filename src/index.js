import m from 'mithril';
import Flipping from 'flipping';

let root = document.body;
let prevIndex = 0;
let cardIndex = 0;
let nextIndex = 1;
let showingFront = true;
let slideToggle = false;
const flipping = new Flipping();
let cards = [
  {front: 'Card 1 - Front', back: 'Card 1 - Back'},
  {front: 'Card 2 - Front', back: 'Card 2 - Back'},
  {front: 'Card 3 - Front', back: 'Card 3 - Back'},
  {front: 'Card 4 - Front', back: 'Card 4 - Back'},
  {front: 'Card 5 - Front', back: 'Card 5 - Back'}
];

let incrementCard = () => {
  flipping.read();
  showingFront = true;
  slideToggle = !slideToggle;
  prevIndex = cardIndex;
  cardIndex = (cardIndex + 1) % cards.length;
  nextIndex = (cardIndex + 1) % cards.length;
  setTimeout(() => {
    flipping.flip();
    console.log(flipping.states);
  }, 1);
};

let App = {
  view: () => {
    return m('div', [
      m('div', 
        {'class': 'card prev-card', 'data-flip-key': `flip-key-${prevIndex}`}, [
          m('div', {'class': 'card-front'}, cards[prevIndex].front),
          m('div', {'class': 'card-back'}, cards[prevIndex].back)
        ]),        
      m('div', 
        {'class': `card ${showingFront ? '' : 'flip-transition'}`, 'data-flip-key': `flip-key-${cardIndex}`}, [
          m('div', {'class': 'card-front'}, cards[cardIndex].front),
          m('div', {'class': 'card-back'}, cards[cardIndex].back)
        ]),        
      m('div', 
        {'class': 'card next-card', 'data-flip-key': `flip-key-${nextIndex}`}, [
          m('div', {'class': 'card-front'}, cards[nextIndex].front),
          m('div', {'class': 'card-back'}, cards[nextIndex].back)
        ]),        
      m('div', {'class': 'btn-group'}, [
        m('button', {'class': 'btn', onclick: () => showingFront = !showingFront}, 'Flip Card'),
        m('button', {'class': 'btn', onclick: incrementCard}, 'Next Card')
      ])
    ]);
  }
};

m.mount(root, App);
