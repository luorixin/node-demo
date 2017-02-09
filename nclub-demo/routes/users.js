var express = require('express');
var router = express.Router();

router.get('/:name',function (req,res) {
	res.render('users',{
		name: req.params.name
	})
})
router.get('/',function (req,res) {
	res.send('hello name');
})
module.exports = router;