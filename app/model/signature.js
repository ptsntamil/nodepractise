const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var signatureSchema = new Schema({
  guestSignature: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdTime: {
  	type: Date
  }
});
signatureSchema.methods.customMethod = function() {
	this.message = this.message + " -Tamil";
	return this.name;
}
signatureSchema.pre('save', (next) => {
	console.log("pre save");
	if(!this.createdTime)
		this.createdTime = new Date();
	next();
})

const Signature = mongoose.model('Signature12', signatureSchema);
module.exports = Signature;
