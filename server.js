const mongoose = require("mongoose");
let val = mongoose.Query.prototype.exec;
mongoose.Query.prototype.fuck = function () {
  this.pleaseCache = true;
  return this;
};
mongoose.Query.prototype.exec = function () {
  console.log(this.getQuery());
  console.log("EXECUTED");
  return val.call(this, ...arguments);
};

mongoose.connect(
  "mongodb://localhost:27017/Sample",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected");
  }
);
var userSchema = mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  created: Date,
});

const User = mongoose.model("User", userSchema);
// var bikash = new User({
//   name: { firstName: "bikash", lastName: "pattnayak" },
//   created: Date.now(),
// });

// bikash.save(function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//     mongoose.disconnect();
//   }
// });

User.find({
  name: { firstName: "bikash", lastName: "pattnayak" },
})
  .fuck()
  .then((response) => {
    console.log(response);
    mongoose.disconnect();
  });
console.log("STOP ");
// mongoose.disconnect();
