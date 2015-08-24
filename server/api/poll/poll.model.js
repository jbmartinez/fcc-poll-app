'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  //name: {type: String, required: true},
  owner: {
    type: Schema.ObjectId,
    ref: 'user'
  },
  question: {type: String, required: true},
  options: [{text: String, count: Number}],
  active: Boolean
});

module.exports = mongoose.model('Poll', PollSchema);