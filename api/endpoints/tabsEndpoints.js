const express = require('express');

const ugs = require('ultimate-guitar-scraper');

const tabsRouter = express.Router();

const db = require('../configuration/db.js');

tabsRouter.get('/artist/:query', (req, res) => {
	// /api/tabs/artist/:query

    const { query } = req.params;

    ugs.advanceSearch({
		bandName: query,
		page: 1,
		type: ['tabs', 'chords']
	  }, (error, tabs) => {
		if (error) {
		  res.status(500).json(error);
		} else {
		  res.status(200).json(tabs);
		}
	});
});

tabsRouter.get('/song/:query', (req, res) => {
	// /api/tabs/song/:query

	const { query } = req.params;

    ugs.search({
		query,
		page: 1,
		type: ['tabs', 'chords']
	  }, (error, tabs) => {
		if (error) {
		  res.status(500).json(error);
		} else {
		  res.status(200).json(tabs);
		}
	});
});

// tabsRouter.get('/:artist/:song', (req, res) => {
// 	// /api/tabs/:artist/:song

// 	const { artist, song } = req.params;

// 	ugs.advanceSearch({
// 		bandName: artist,
// 		songName: song,
// 		type: ['chords']
// 	}, (error, tabs) => {
// 		if (error) {
// 		  res.status(500).json(error);
// 		} else {
// 		  res.status(200).json(tabs);
// 		}
// 	});

// })

tabsRouter.post('/url', (req, res) => {
	// /api/tabs/url/

    const { url } = req.body;

	let tabUrl = url;
	ugs.get(tabUrl, (error, tab) => {
		if (error) {
			res.status(500).json(error);
		  } else {
			res.status(200).json(tab);
		  }
	});
});

module.exports = tabsRouter;
