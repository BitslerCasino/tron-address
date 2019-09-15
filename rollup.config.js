import pkg from './package.json';
export default [
  {
		input: 'index.js',
		external: ['bip39','bip32','tronweb'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
]