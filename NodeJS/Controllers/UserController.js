const User           = require('../Models/User');
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');
const UserRepo       = require('../Data/UserRepo');
const _userRepo      = new UserRepo();

// Handles 'POST' with registration form submission.
exports.RegisterUser  = async function(req, res){
   
    var password        = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (password == passwordConfirm) {

        // Creates user object with mongoose model.
        // Note that the password is not present.
        var newUser = new User({
            firstName:    req.body.firstName,
            lastName:     req.body.lastName,
            email:        req.body.email,
            username:     req.body.username,
            role:         '',
        });
       
        // Uses passport to register the user.
        // Pass in user object without password
        // and password as next parameter.
        User.register(new User(newUser), req.body.password, 
                function(err, account) {
                    // Show registration form with errors if fail.
                    if (err) {
                        return res.json( 
                        { user : newUser, errorMessage: err });
                    }
                    // User registered so authenticate and redirect to secure 
                    // area.
                    passport.authenticate('local') (req, res, 
                            function () { res.json( {errorMessage:{message:"" }}) });
                });

    }
    else {
      res.json( { user:newUser,errorMessage: {message:"Passwords do not match." }})
    }
};



