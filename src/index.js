import m from 'mithril';

let root = document.body;
let prevIndex = 0;
let cardIndex = 0;
let nextIndex = 1;
let showingFront = true;

let cards = [
  {front: 'Card 1 - Front', back: 'Card 1 - Back'},
  {front: 'Card 2 - Front', back: 'Card 2 - Back'},
  {front: 'Card 3 - Front', back: 'Card 3 - Back'},
  {front: 'Card 4 - Front', back: 'Card 4 - Back'},
  {front: 'Card 5 - Front', back: 'Card 5 - Back'}
];

let incrementCard = () => {
  showingFront = true;
  prevIndex = cardIndex;
  cardIndex = (cardIndex + 1) % cards.length;
  nextIndex = (cardIndex + 1) % cards.length;
};

const flipper = (func) => {
  const cardId = `#flip-${cardIndex}`;
  const nextId = `#flip-${nextIndex}`;
  // Get initial positions
  const firstCard = document.querySelector(cardId);
  const firstNext = document.querySelector(nextId);
  const firstCardRect = firstCard.getBoundingClientRect();
  const firstNextRect = firstNext.getBoundingClientRect();
  console.log(firstCardRect);

  // Execute layout changing function
  func();

  // Get final positions
  const lastCard = document.querySelector(cardId);
  const lastNext = document.querySelector(nextId);
  const lastCardRect = lastCard.getBoundingClientRect();
  const lastNextRect = lastNext.getBoundingClientRect();
  console.log(lastCardRect);

  // Calculate the change in positions
  const cardX = firstCardRect.left - lastCardRect.left;
  console.log(cardX);
  
  // Animate from first position to last position
  lastCard.animate([{
    transformOrigin: 'top left',
    transform: `translateX(${cardX}px)`
  }, {
    transformOrigin: 'top left',
    transform: 'none'
  }, {
    duration: 500,
    easing: 'ease-in-out',
  }])
}

let App = {
  view: () => (
    <div>
      <div class="card prev-card" id={`flip-${prevIndex}`}>
        <div className="card-front">{cards[prevIndex].front}</div>
        <div className="card-back">{cards[prevIndex].back}</div>
      </div>
      <div className={`card ${showingFront ? '' : 'flip-transition'}`} id={`flip-${cardIndex}`} >
        <div className="card-front">{cards[cardIndex].front}</div>
        <div className="card-back">{cards[cardIndex].back}</div>
      </div>
      <div class="card next-card" id={`flip-${nextIndex}`}>
        <div className="card-front">{cards[nextIndex].front}</div>
        <div className="card-back">{cards[nextIndex].back}</div>
      </div>

      <div class="btn-group">
        <button class="btn" onclick={() => showingFront = !showingFront}>Flip Card</button>
        <button class="btn" onclick={() => flipper(incrementCard)}>Next Card</button>
      </div>
    </div>
  )
};

m.mount(root, App);
