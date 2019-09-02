const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Everything happens sync. Can't access global APIs or timer APIs
class UnderlineWorklet {
	// Custom properties to search for
	static get inputProperties() {
		return [
			"--line-width",
			"--stroke",
			"--number-of-underlines",
			"--spread-offset"
		];
	}

	constructor() {
		// Set the default values for our properties
		this.defaultOptions = {
			"--line-width": 4,
			"--stroke": "pink",
			"--spread-offset": 20,
			"--number-of-underlines": 2
		};
	}

	// A custom function that searches for a value
	// for a property otherwise sets the default value
	getValue(properties, which) {
		if (properties.get(which).length) {
			return properties
				.get(which)
				.toString()
				.trim();
		}

		return this.defaultOptions[which];
	}

	// Main function that paints the canvas and replace the background image with the drawing context
	paint(ctx, size, properties) {
		console.log(typeof window);
		ctx.lineWidth = properties
			.get("--line-width")
			.toString()
			.trim();

		ctx.strokeStyle = this.getValue(properties, "--stroke");

		const underlines = this.getValue(properties, "--number-of-underlines");
		const spreadOffset = this.getValue(properties, "--spread-offset");

		for (let i = 0; i < underlines; i++) {
			// Tell the drawing context that we want to draw a path (SVG path element)
			ctx.beginPath();
			// Before drawing any shape, move to the coordinate (x, y)
			ctx.moveTo(0, random(0, spreadOffset) + size.height / 1.15);
			// Draw a line (path) from position x to y
			ctx.lineTo(size.width, random(0, spreadOffset) + size.height / 1.15);
			// Draw it using the stroke value (color)
			ctx.stroke();
		}
	}
}

registerPaint("underline-worklet", UnderlineWorklet);
