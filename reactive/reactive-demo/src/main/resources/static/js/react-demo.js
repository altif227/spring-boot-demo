var url = 'http://localhost:8080/bank-item/reactive'; 

var refreshButton = document.getElementById('fetch');

var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

refreshClickStream.subscribe(event => {
	var responseStream = Rx.Observable.fromPromise($.getJSON(url));
	responseStream.subscribe(jsonData => {responseSubscriber(jsonData);});
});

var responseSubscriber = function(rawJsonData) {
	var responseArrayStream = Rx.Observable.from(rawJsonData);
	responseArrayStream.subscribe(row => {responseArraySubscriber(row);});
};

var responseArraySubscriber = function(row) {
	console.log(row.id);
	addRow(row.id);
};

function addRow(newValue) {
    var ul = document.getElementById("items");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(newValue));
    ul.appendChild(li);
}