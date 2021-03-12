//MUST BE RAN AS "node --experimental-json-modules .\nogui.js" in terminal for this to work!

import Database from '../Database.js';


//Load Database!
var assessments = Database.LoadAssessments();
var questions = Database.LoadQuestions();

// console.log(questions);
// console.log(assessments);

var selectedAssessment = 1;

for (var i = 0; i < assessments[selectedAssessment].questionsID.length; i++)
{
    console.log(assessments[selectedAssessment].questionsID[i] + ' ' + questions[ assessments[selectedAssessment].questionsID[i]].text);
}

