var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var myschema = new Schema({

        u_name:String,    
        user_city:String,
        user_country:String,
        gender:String,
        img_file:String
        

});

module.exports=mongoose.model('userdata',myschema);