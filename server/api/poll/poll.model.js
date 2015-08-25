'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  question: {type: String, required: true},
  options: [{text: String, count: String}],
  active: Boolean
});

module.exports = mongoose.model('Poll', PollSchema);