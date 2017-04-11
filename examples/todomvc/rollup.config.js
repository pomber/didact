import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	dest: 'build/app.js',
	format: 'iife',
	sourceMap: true,
	external: [],
	plugins: [
		babel({
			babelrc: false,
			presets: [
				'es2016',
				'stage-1'
			],
			plugins: [
				'external-helpers',
				['transform-react-jsx', { pragma:'createElement' }]
			]
		}),
		nodeResolve({ jsnext:true }),
		commonjs()
	]
};
