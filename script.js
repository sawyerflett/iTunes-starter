function run() {

    //keep the existing entity parameter
    //add term and limit parameters using user entered values
    //additional parameters are connected with "&"
    let typeField = document.getElementById("textInput");
    let searchValidText = typeField.value.replaceAll(" ", "+")
    searchValidText = letterOnlyString(searchValidText);

    let url = "https://itunes.apple.com/search?entity=musicTrack&term=" + searchValidText + "&limit=4";

    //connects to iTunes api and passes off to process function on success
    $.ajax({
        url: url,
        dataType: "json",
        success: process
    });

}

function process(data) {
    console.log(data.results)
    console.log(data.results[0])
    let o = "";

    //builds a giant html string - you need to add the fields 
    //from iTunes into the table and then....
    for (let p = 0; p < data.results.length; p++) {
        let trackData = data.results[p]
        let length = trackData.trackTimeMillis
        length /= 1000;
        length = formatTime(length);
        o += "<tr>";
        o += "<td>" + p + "</td>";
        o += "<td>" + trackData.artistName + "</td>";
        o += "<td>" + "<img src = '" + trackData.artworkUrl100 + "'></img>" + "</td>";
        o += "<td>" + trackData.trackName + "</td>";
        o += "<td>" + length + "</td>";
        o += "<td></td>";
        o += "</tr>";
    }

    //adds the created table to the page
    let table = document.getElementById("output");
    table.innerHTML = o;
    table.style.display = "table";
    table.style.backgroundColor = "gold";
}

function letterOnlyString(input) {
    let validCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '+', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let array = input.split('');
    input = "";
    for (let i = 0; i < array.length; i++) {
        let check = array[i].toLowerCase();
        if (validCharacters.indexOf(check) != -1) input += array[i];
    }
    return input;
}
function formatTime(seconds) {
    let firstMinutes = Math.floor((seconds / 60) % 10)
    let secondMinutes = Math.floor((seconds % 3600) / 600);
    let firstSeconds = Math.floor(seconds % 10)
    let secondSeconds = Math.floor((seconds % 60) / 10)
    let hours = "";
    if (seconds >= 3600) hours = Math.floor(seconds / 3600) + ":";
    if (secondMinutes == 0 && hours == 0) secondMinutes = "";
    return hours + secondMinutes + "" + firstMinutes + ":" + secondSeconds + "" + firstSeconds;
}