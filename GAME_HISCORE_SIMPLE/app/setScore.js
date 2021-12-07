/*
This is the part that grabs the input from the user, through the form, and inserts it in the DB
*/

//Main function, called at line 50
var setScore = function (pts) {
	//This is the backend file inserting in the DB
	const php = "app/setScore.php";

	//This is what we send to the server for the PHP file, the AJAX
	const xhr = new XMLHttpRequest();
	let formData = new FormData();

	//Add the score to the formData
	formData.append("Score",pts);

	//Connect to the PHP
	xhr.open("POST", php, true);
	xhr.onreadystatechange = function () {
		//Check that the connection is fine and that the PHP file answers
		console.log('readyState: ' + xhr.readyState);
		console.log('status: ' + xhr.status);
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Everything ok, get the response
			console.log(xhr.responseText);
		}
	};
	xhr.send(formData); //send AJAX call
};
//This function is called from the game