//MUST BE RAN AS "node --experimental-json-modules .\assessmentTest.js" in terminal for this to work!

import Database from '../Database.js';

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

//Load Database!
var assessments = Database.LoadAssessments();
var questions = Database.LoadQuestions();
var grading = []

// console.log(questions);
// console.log(assessments);

var selectedAssessment = 1;

for (var i = 0; i < assessments[selectedAssessment].questionsID.length; i++)
{
    console.log(assessments[selectedAssessment].questionsID[i] + ' ' + questions[ assessments[selectedAssessment].questionsID[i]].text);

    //Accept Input
    var input;
    rl.question('True of False  ', (answer) => {

        input = answer;
    
        rl.close();
    });

    grading.push(input)
}

console.log("FINISHED!");