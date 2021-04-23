//MUST BE RAN AS "node --experimental-json-modules .\databaseTemplate.js" in terminal for this to work!

import Database from '../Database.js';


//Load Database!
var questions = Database.LoadQuestions();

console.log(questions);

for (var i = 0; i < questions.length; i++)
{
    var tags = questions[i].tags;
    if (tags[0] == "WH")
        console.log(i + ' ' + tags[0]);

    // var title = questions[i].title;
    
}