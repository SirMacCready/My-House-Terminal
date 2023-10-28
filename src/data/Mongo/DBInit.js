
const mongoose = require('mongoose');

// connecting to the DB
mongoose.connect('mongodb+srv://MacCready:PublicPassword@publichouseterminal.a8mxpw2.mongodb.net/PublicHomeStock?retryWrites=true&w=majority');

// defining the Schema of the documents in the collection
const foodSchema = {
    name: String,
    Brand: String,
    UseByDate: String,
    AVGTimeToFinish: String,
    Quantity : Number,
    Place : String,
    Type  : String

  }
// creating a mongoose model
const Food = mongoose.model("Food", foodSchema ,"FullStock");
// Exporting the Food Model to use it in another file
module.exports = Food;