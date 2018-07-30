const express = require('express');
const router = express.Router();
const mysql = require('../connection/mysql');
const responseUtils = require('../utils/responseUtils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Messenger Application' });
});

router.get('/closeConnection', function(req, res, next){
	global.logger.debug('Receive request to close mysql connection');
	mysql.closeConnection();
	responseUtils.send(res, 200, 'Closed connection successfully', 'string');

});

router.get('/createConnection', function(req, res, next){
	global.logger.debug('Receive request to create mysql connection');
	mysql.createConnection();
	responseUtils.send(res, 200, 'Created connection successfully', 'string');

});

module.exports = router;
