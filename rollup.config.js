import minify from "rollup-plugin-babel-minify";

const outFolder = "dist";

export default [
	{
		input: "src/underline-worklet.js",
		output: {
			file: `${outFolder}/underline-worklet.bundled.js`,
			format: "iife"
		},
		plugins: [minify({ comments: false })]
	}
];
