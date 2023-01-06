// Bring in Required Files (Tables)
const User = require('./User');
// const Exercise = require('./Exercise');

// // Connection between Tables
// User.hasMany(Exercise, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE' // May change this?
// });

// Exercise.belongsTo(User, {
//     foreignKey: 'user_id'
// });


module.exports = { User};

// module.exports = { User, Exercise };