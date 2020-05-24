const api = require('genius-api');
const scrape = require('scrape-it');
const fs = require('fs');
require('dotenv').config();
const token = process.env.GENIUS_CLIENT_ACCESS_TOKEN;
const genius = new api(token);

async function getLyrics(artistName) {
	try {
		console.log(`Get lyrics for: ${artistName}`);
		const artistResponse = await genius.search(artistName);
		const hits = artistResponse.hits;

		const options = {
			apiKey: token,
			optimizeQuery: true,
		};

		const result = await Promise.all(
			hits.map(({ result }) =>
				scrape(result.url, {
					lyrics: '.lyrics p',
				}),
			),
		);

		result.forEach(({ data }, index) => {
			const path = hits[index].result.path;
			const fileName = `lyrics/${artistName.replace(/\s/, '')}-${path.replace(
				'/',
				'',
			)}.txt`;

			if (data.lyrics.length > 0) {
				fs.writeFileSync(fileName, data.lyrics, { encoding: 'utf8' });
			}
		});
	} catch (e) {
		console.log(`error: ${e}`);
	}
}

for (let i = 0; i < 1; i++) {
	[
		'maria becerra',
		'mesita',
		'blunted vato',
		'zanto',
		'polima westcoast',
    'big soto',
		'louta',
		'ysy a',
		'duki',
		'neo pistea',
		'khea',
		'nicki nicole',
		'seven kayne',
		'bhavi',
		'cazzu',
		'lucho ssj',
		'we$t dubai',
		'trueno',
		'wos',
		'paulo londra',
		'lit killah',
		'dillom',
		'C.R.O (Bardero$)',
		'paco amoroso',
		'ca7riel',
		'drefquila',
		'fmk',
		'ecko',
		'dakillah',
	].forEach((artist, index) =>
		setTimeout(() => getLyrics(artist), index * 3000),
	);
}
