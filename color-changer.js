/*
Write a Javascript module with the following specs:
- When executed, it will change browser background to a random color every second.
	// include a reference to this file in your html code to execute, using window.onload
- Colors should not repeat.  (i.e. once a color is used, don’t use it again)
	// verifies each hex value in the colorlist is unique using indexOf before pushing new colors
- Stop changing the color after 10 seconds.
	// iterates through a list of colors of given length (10) changing the background every second
- Make it so someone can import the module into their own project
	// code can be hosted and delivered via file server/CDN or the file can be downloaded from git
*/

// namespace
var ColorChanger = (function () {

	window.onload = function() {
		initialize();
		randomize();
	}

	// setup a display
	function initialize(){
		var colorContainer = document.createElement('div');
		colorContainer.setAttribute('id', 'color-container');

		var colorCodeText = document.createElement('h1');
		colorCodeText.setAttribute('id', 'color-text');
		colorCodeText.setAttribute('align', 'center');

		document.body.appendChild(colorContainer);
		document.getElementById('color-container').appendChild(colorCodeText);
	}

	/**
	 * randomly generates a colorlist  of hexidecimal characters
	 * and changes the background color of the document.body
	 * to the next color in the list every second
	 */
	function randomize() {
		var colorList = _generateColorList(10);

		Object.keys(colorList).forEach(function(color, index){
			setTimeout(function(){
				// change background color
				document.body.style.backgroundColor = color;

				// display current rgb value if exists
				var displayDiv = document.getElementById('color-text');
				if (displayDiv){
					displayDiv.innerHTML = color;
				}

			}, index * 1000); // wait one second per iteration
		});
	}

	// export for custom use
	return {
		initialize: initialize,
		randomize: randomize
	}

	// helpers
	function _generateColorList(length){
		var colors = {};
		while(Object.keys(colors).length < length){
			var randColor = _generateHexidecimal();

			//if colors[randColor] isnt already a key. make it one
			if(!colors[randColor]){
				colors[randColor] = true; // value of true, to hold the place
			}
			else {
				console.log('key already found, skipping')
			}
		}
		return colors;
	}

	function _generateHexidecimal(){
		var chars = '1234567890ABCDEF';
		var hex = '#';
		for (var i = 0; i < 6; i++){
			var randomIndex = Math.floor(Math.random() * 16); //gen index # between 1-16
			hex += chars[randomIndex];
		}
		return hex;
	}
}());
