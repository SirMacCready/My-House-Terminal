const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://SirMacCready:ItsFreeRealEstate@myhouseterminal.ktpo8xy.mongodb.net/HomeStock?retryWrites=true&w=majority');

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