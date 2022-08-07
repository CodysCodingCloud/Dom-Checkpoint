/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
	let qty = document.getElementById("coffee_counter");
	qty.innerText = coffeeQty;
	// your code here
}

function clickCoffee(data) {
	data.coffee++;
	updateCoffeeView(data.coffee);
	renderProducers(data);
	// your code here
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
	producers.forEach((pro, index) => {
		if (pro.price / 2 <= coffeeCount) {
			pro.unlocked = true;
		}
	});
	// your code here
}

function getUnlockedProducers(data) {
	return data.producers.filter((elem) => elem.unlocked);
	// your code here
}

function makeDisplayNameFromId(id) {
	return id
		.split("_")
		.map((word) => {
			let wordArr = word.split("");
			wordArr[0] = wordArr[0].toUpperCase();
			return wordArr.join("");
		})
		.join(" ");
	// your code here
}
// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
	const containerDiv = document.createElement("div");
	containerDiv.className = "producer";
	const displayName = makeDisplayNameFromId(producer.id);
	const currentCost = producer.price;
	const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
	containerDiv.innerHTML = html;
	return containerDiv;
}

function deleteAllChildNodes(parent) {
	// console.log("num node1", parent.childNodes.length);
	let nodeLS = [...parent.childNodes];
	nodeLS.forEach((child) => parent.removeChild(child));
	// parent.childNodes.forEach((child) => parent.removeChild(child));
	// console.log("num node1", parent.childNodes.length);
	// your code here
}

function renderProducers(data) {
	// console.log("datapoint \n", data);
	unlockProducers(data.producers, data.coffee);
	let unlocked = getUnlockedProducers(data);
	const producerContainer = document.getElementById("producer_container");
	deleteAllChildNodes(producerContainer);
	unlocked.forEach((uncle) => {
		producerContainer.append(makeProducerDiv(uncle));
	});
	// your code here
}
/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
	let target = {};
	data.producers.forEach((pro) => {
		if (pro.id === producerId) {
			target = pro;
		}
	});
	return target;
	// your code here
}

function canAffordProducer(data, producerId) {
	let pro = getProducerById(data, producerId);
	return data.coffee >= pro.price;
	// your code here
}

function updateCPSView(cps) {
	let cpsE = document.getElementById("cps");
	cpsE.innerText = cps;
	// your code here
}

function updatePrice(oldPrice) {
	return Math.floor(oldPrice * 1.25);
	// your code here
}

function attemptToBuyProducer(data, producerId) {
	if (canAffordProducer(data, producerId)) {
		let targetProducer = getProducerById(data, producerId);
		data.coffee -= targetProducer.price;
		targetProducer.qty += 1;
		data.totalCPS += targetProducer.cps;
		updateCPSView(data.totalCPS);
		targetProducer.price = updatePrice(targetProducer.price);
		return true;
	} else {
		return false;
	}
	// your code here
	//why is a boolean being asked for again when we already have canAffordProducer()
}

function buyButtonClick(event, data) {
	if (event.target.tagName == "BUTTON") {
		let producerId = event.target.id.slice(4);
		if (canAffordProducer(data, producerId)) {
			attemptToBuyProducer(data, producerId);
			renderProducers(data);
			updateCoffeeView(data.coffee);
		} else {
			window.alert("Not enough coffee!");
		}
	}
	// your code here
}

function tick(data) {
	// console.log(data);
	data.coffee += data.totalCPS;
	updateCoffeeView(data.coffee);
	renderProducers(data);
	// your code here
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
if (typeof process === "undefined") {
	// Get starting data from the window object
	// (This comes from data.js)
	const data = window.data;

	// Add an event listener to the giant coffee emoji
	const bigCoffee = document.getElementById("big_coffee");
	bigCoffee.addEventListener("click", () => clickCoffee(data));

	// Add an event listener to the container that holds all of the producers
	// Pass in the browser event and our data object to the event listener
	const producerContainer = document.getElementById("producer_container");
	producerContainer.addEventListener("click", (event) => {
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
		tick,
	};
}
