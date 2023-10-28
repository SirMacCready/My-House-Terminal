const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MacCready:PublicPassword@publichouseterminal.a8mxpw2.mongodb.net/PublicHomeStock?retryWrites=true&w=majority');

const foodSchema = {
    name: String,
    Brand: String,
    UseByDate: String,
    AVGTimeToFinish: String,
    Quantity : Number,
    Place : String,
    Type  : String

  }
const Food = mongoose.model("Food", foodSchema ,"FullStock");
console.log(Food);
module.exports = Food;