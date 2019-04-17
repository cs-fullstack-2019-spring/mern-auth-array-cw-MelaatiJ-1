var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type:String, required:true, max:100},
        password: {type:String, required:true, max:100},
        favoriteBook: [{type:String}],
    }


);

module.exports = mongoose.model("Users", UserSchema);