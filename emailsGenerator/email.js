const express = require('express');
const router = express.Router();

eachWordFirstChars = (input) => {
    input =input.split(/[ -]+/).map(word => word[0]).join('');
    return input
}

wordsCount = (input) => {
    input = input.match(/(\w+)/g).length;
    return input
}

lastWords = (input) => {
    input = input.split(/[ -]+/).slice(-1)[0]
    return input
}


router.get('/emails-generator' , (req, res) => {
    let data = [];
    email = {
      input1: req.query.input1,
      input2: req.query.input2,
      input3: req.query.input3,
      input4: req.query.input4,
      input5: req.query.input5
    } 
  
    expression = eachWordFirstChars(email.input1) + '.' + ( wordsCount(email.input2) > 1 ? eachWordFirstChars(email.input2) + lastWords(email.input2) + lastWords(email.input2): email.input2)
    + '@' + email.input3 + '.' + email.input4 + '.' + email.input5;
   
    data.push({id : expression, value: expression});

    res.json({data : data})
});

module.exports= router;