const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//------------------bcryptjs---------------------//

var password = 'abc1234!';

// bcrypt.genSalt(8, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashingPassword = '$2a$08$o.JeJ0hgc5Y4zF73MekB6O3aeSTaxYdGwd0H/URslqARNhnjTorq.';

bcrypt.compare(password, hashingPassword, (err, result) => {
    console.log('Compare result: ', result);
});

//----------------------------------------------//

// var data = {
//     id: 7
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded: ', decoded);

//////////////////////////////
//                          //
//   What is JWT implement  //
//                          //
//////////////////////////////

// var message = 'I am a user';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash string: ${hash}`);

// var data = {
//     id: 4
// };
// var token= {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed.');
// } else {
//     console.log('Data was changed. Do not trust!');
// }