var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema = new Schema({

        user_name:String,
        email_name:String,
        password:String,

});

module.exports=mongoose.model('signup',myschema);