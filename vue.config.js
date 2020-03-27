const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
	configureWebpack: {
		plugins: process.env.NODE_ENV !== 'production' ? [
			new VuetifyLoaderPlugin()
		] : [],
		output: {
			libraryExport: 'default'
		}
	}
}
