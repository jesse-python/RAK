 var mongoose = require('mongoose');

var User = mongoose.model('user');
var bcrypt = require('bcrypt');
var act = mongoose.model('act');

module.exports = {
	login: function(req, res) {
		// console.log(req.body.email);
		// console.log(req.body.password);

		User.findOne({email: req.body.email}, function(err, user) {

			// console.log(user);
			// console.log(user.password);

			if (bcrypt.compareSync(req.body.password, user.password) === true) {
				res.json(user);

			} else {
				res.json("wrong email or wrong password");
			}

		});	

	},
	create: function(req,res){

		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password, salt);


		var newUser = new User({
			name: req.body.name,
			alias: req.body.alias,
			email: req.body.email,
			password: hash
		})



		newUser.save(function(err, newUser){
			if(err){
				// console.log(err);
				res.send(err);
			} else{
				res.json(newUser);
			}
		})
	},
	update: function(req,res){
		User.findOne({_id: req.params.id}, function(err, users){
			user.acts.completed = req.body.acts.completed;
			user.save(function(err, user){
				if(err){
					res.send(err);
				} else {
					res.json(user);
				}
			})
		})
	},


	addFriend: function(req,res){
		User.findOne({_id: req.params.id}, function(err, user){
			// console.log(user);
			user.friends.push(req.body.friendID);

			user.save(function(err,User){
				if(err){
					res.send(err);
				} else {
					res.json(User);
				}
			})
		})
	},


	destroy: function(req, res){
		User.findOne({_id: req.params.id}, function(err, person){
			console.log(person, "user array")
			console.log(req.body.friendID, 'friendID');
			var index = undefined;

			for(var i = 0; i < person.friends.length; i++) {
				if(person.friends[i] == req.body.friendID) {
					index = i;
				}
			}

			person.friends.splice(index, 1);
			index = undefined;
			person.save(function(err, person){

				if(err){
					res.send(err);
				} else {
					res.json(person);
				}
			})

		})
	},

	show: function(req,res){
		User.findOne({_id: req.params.id}).deepPopulate('friends acts acts.act_info friends.acts friends.acts.act_info')

		.exec(function(err, user) {
			// console.log(user);
			if(err){
				res.json(err);
			} else {
				res.json(user)
			}
		})
	},
	addAct: function(req,res){

		// console.log(req.body.userID)
		// console.log(req.body.actID)
		

		User.findOne({_id: req.body.userID}, function(err, user){
			// console.log('these are user acts')
			// console.log(user.acts)
			// user.acts[user.acts.length].act_info = req.body.actID;
			user.acts.push({act_info: req.body.actID, completed: false})

			user.save(function(err,User){
				if(err){
					res.send(err);
				} else {
					console.log(user)
					res.json(User)
				}
			})
		})
	},
	completeAct: function(req,res){
		// console.log(req.body.recommend)
		
	},




	
	index: function(req,res){
		User.find({}).deepPopulate('acts acts.act_info')

		.exec(function(err, users) {
			if(err) {
				res.json(err)
			} else {
				res.json(users);
			}
		})


		// User.find({}, function(err, users){
		// 	if(err){
		// 		res.send(err);
		// 	} else {
		// 		res.json(users);
		// 	}
		// })
	}

	// show: funcion(req, res) {
	// 	User.findOne({_id: req.params.id})
	// }
}