$(document).ready(function(){

var topics = ["Dog", "Cat", "Goat", "Cow", "Beaver", "Frog", "Snake", "Bear"]

function displayInfo() {
	var outdoorAnimals = $(this).attr("data-name");
    var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + outdoorAnimals+ "&api_key=ol7azSkKjUyK9PBSKSRLNN1AE1hZ4LLb&limit=5";
    console.log(queryURL)
$.ajax({
		url: queryURL, 
		method: "GET"
	}).then(function(response) {
		var results = response.data;
		$("#animals").empty();
		for (var i = 0; i < results.length; i++) {
		var topicDiv = $("<div class='animals'>");
		var rating = response.data[i].rating;
		var pRate = $("<p>").text("Rating: " + rating);
		topicDiv.append(pRate);
		var giphyImgStill = response.data[i].images.downsized_still.url;
		var giphyImgMotion = response.data[i].images.downsized.url;
		var image = $("<img>").attr("src", giphyImgStill);
        image.attr("data-state", "still");
		image.attr("id", "img"+ i);
        image.attr("data-still", giphyImgStill);
		image.attr("data-animate", giphyImgMotion);
		image.addClass("giphyImgs");
		topicDiv.prepend(image);
		$("#animal").prepend(topicDiv);
		}
	})
}
function renderButtons() {
	$("#animalButtons").empty();
	console.log(topics)
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic");
		a.addClass("btn btn-lg");
		a.attr("data-name", topics[i]);
		a.attr("type", "button");
		a.text(topics[i]);
		$("#animalButtons").append(a);
	}
}
$("#addAnimal").on("click", function(event) {
	event.preventDefault();
    var topic = $("#animal-input").val().trim();
	topics.push(topic);
	renderButtons();
    $("form").trigger("reset")
    });

$(document).on("click", ".topic", displayInfo);
renderButtons();
$(document).on("click", ".giphyImgs", flipAnimate);

function flipAnimate() {
	var item = $(this).attr("id");
	item = "#"+ item;
	var state = $(item).attr("data-state");
	if (state === "still") {
        $(item).attr("src", $(item).attr("data-animate"));
        $(item).attr("data-state", "animate"); 
      } else {
        $(item).attr("src", $(item).attr("data-still"));
        $(item).attr("data-state", "still");
      };
};
})
