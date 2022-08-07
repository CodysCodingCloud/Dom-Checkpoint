if (localStorage["mydata"]) {
	console.log("getting data");
	// localStorage.
	window.data = JSON.parse(localStorage["mydata"]);
}
const storeIt = (event) => {
	event.preventDefault();
	console.log("data being stored");
	localStorage.setItem("mydata", JSON.stringify(data));
};
window.addEventListener("beforeunload", storeIt);
const saveCoffee = document.getElementById("save");
saveCoffee.addEventListener("click", storeIt);
