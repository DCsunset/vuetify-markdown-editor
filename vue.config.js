const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
	configureWebpack: {
		plugins: [
			new VuetifyLoaderPlugin()
		],
		output: {
			libraryExport: 'default'
		}
	}
}
