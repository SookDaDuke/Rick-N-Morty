/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
document.getElementById('coffee_counter').innerText = coffeeQty
}

function clickCoffee(data) {
  data.coffee++
  updateCoffeeView(data.coffee)

  renderProducers(data)
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  producers.filter((elem) => coffeeCount >= (elem.price / 2))
  .map((elem) => elem.unlocked = true)
}

function getUnlockedProducers(data) {
  return data.producers.filter((elem) => elem.unlocked === true)
}

function makeDisplayNameFromId(id) {
 return id.split('_')
 .map((elem) => elem[0].toUpperCase() + elem.slice(1))
 .join(' ')

}

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Portal Fluid/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} portal fluid</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  while (parent.hasChildNodes()) {
    const children = parent.childNodes
    parent.removeChild(children[0])
  }
}

function renderProducers(data) {
  // create producer container
  // get unlocked producers & call make producer div to make div
  // append divs to producer container div
  // deletes the producer container's children before appending new producers

  const producerContainer = document.getElementById('producer_container') // object

  deleteAllChildNodes(producerContainer) // deletes children of producerContainer

  unlockProducers(data.producers, data.coffee)

  getUnlockedProducers(data).map((elem) => { // GUP is an array of unlocked pros
    let childDiv = makeProducerDiv(elem) // elem is a producer obj. this makes a div
    producerContainer.appendChild(childDiv) // attaches producer obj div to producer container
  })
}

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
return data.producers.filter((elem) => elem.id === producerId)[0]
}

function canAffordProducer(data, producerId) {
  const producer = data.producers.filter((elem) => elem.id === producerId)[0]
  if (producer.price <= data.coffee) {
    return true
  } else {
    return false
  }
}

function updateCPSView(cps) {
  document.getElementById('cps').innerText = cps
}

function updatePrice(oldPrice) {
return Math.floor(oldPrice * 1.25)
}

function attemptToBuyProducer(data, producerId) {
  if (canAffordProducer(data, producerId) === false) {
    return false
  }
  if (canAffordProducer(data, producerId) === true) {
    const producer = data.producers.filter((elem) => elem.id === producerId)[0]
    producer.qty++
    data.coffee = data.coffee - producer.price
    producer.price = updatePrice(producer.price)
    data.totalCPS = data.totalCPS + producer.cps
    updateCPSView(producer.cps)
    return true
  }
}

function buyButtonClick(event, data) {
  if (event.target.tagName !== 'BUTTON') {
    return false
  }

  const producerId = event.target.id.slice(4)

  if (canAffordProducer(data, producerId) === false) {
    return window.alert("Not enough portal fluid!")
  }
  if (canAffordProducer(data, producerId) === true) {
    attemptToBuyProducer(data, producerId)
    renderProducers(data)
    updateCoffeeView(data.coffee)
    updateCPSView(data.totalCPS)

  }
}

function tick(data) {
  const coffeeCounter = document.getElementById('coffee_counter')

  data.coffee = data.coffee + data.totalCPS
  coffeeCounter.innerText = data.coffee
  renderProducers(data)
}

/*************************
 *  Start your engines!
 *************************/

// You don't need to edit any of the code below
// But it is worth reading so you know what it does!

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === 'undefined') {
  // Get starting data from the window object
  // (This comes from data.js)
  const data = window.data;

  // Add an event listener to the giant coffee emoji
  const bigCoffee = document.getElementById('big_coffee');
  bigCoffee.addEventListener('click', () => clickCoffee(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const producerContainer = document.getElementById('producer_container');
  producerContainer.addEventListener('click', event => {
    buyButtonClick(event, data);
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 1000);
}
// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick
  };
}
