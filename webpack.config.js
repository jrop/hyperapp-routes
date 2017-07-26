const builder = require('webpack-configify').default

const PROD = process.env.NODE_ENV == 'production'

module.exports = builder()
	.development(!PROD)
	.production(PROD)
	.src('src/index.ts')
	.dest('lib')
	.loader('.ts', 'awesome-typescript-loader')
	.merge({
		output: {
			library: 'routes',
			libraryExport: 'default',
			libraryTarget: 'umd',
		},
	})
	.build()
