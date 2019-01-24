const xml2js = require('xml2js');
const request = require('request');
const cheerio = require('cheerio');

let Shopify = {};

Shopify.parseSitemap = function (url, userAgent, callback) {

	request({
		method: 'get',
		url: 'https://' + url + '/sitemap_products_1.xml',
		gzip: true,
		headers: {
			'User-Agent': userAgent
		}
	}, (err, resp, body) => {

		if (err) return callback(err, null);

		if (body.indexOf('Please try again in a couple minutes by refreshing the page') > -1) {

			return callback('Temp Ban Occured.', null);

		} else if (body.indexOf('http://www.sitemaps.org/schemas') > -1) {

			const parsed = xml2js.parseString(body, (error, result) => {

				if (err || result == undefined) return callback(error, true);

				let products = result['urlset']['url'];
				products.shift()
				return callback(null, products);

			})

		} else {
			return callback('Invalid Shopify Site.', null);
		}

	})

}