/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

// do not seed admin user if we're in production
if (process.env.NODE_ENV === 'production') {
  User.find({}).remove(function() {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, function() {
        console.log('finished populating users');
      }
    );
  });
} else {
  User.find({}).remove(function() {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function() {
        console.log('finished populating users');
      }
    );
  });
}

Poll.find({}).remove(function() {
  Poll.create({
    question: 'Do you like answering polls?',
    options: [
      {text: 'Yes!', count: 20},
      {text: 'No', count: 10},
      {text: 'Meh', count: 5}
    ]
  }, {
    question: 'Are you learning in Free Camp Code?',
    options: [
      {text: 'of course!', count: 45},
      {text: 'definitely!', count: 30}
    ]
  }, {
    question: 'Whats your favorite programming language?',
    options: [
      {text: 'JavaScript', count: 40},
      {text: 'ruby', count: 10},
      {text: 'python', count: 35},
      {text: 'lua', count: 15},
      {text: 'C', count: 7},
      {text: 'PHP', count: 21}
    ]
  });
});