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

// Choose the assessment to take and create an array to store the answers.
var selectedAssessment = 4;
var answers = [];

// For each question, display the ID and text of the question.
for (var i = 0; i < assessments[selectedAssessment].questionsID.length; i++)
{
    console.log(assessments[selectedAssessment].questionsID[i] + '. ' + questions[ assessments[selectedAssessment].questionsID[i]].text);
    
    // Answer each question, store its result, and output to the console if it was correct.
    if (assessments[selectedAssessment].questionsID[i] % 2)
    {
        answers[i] = true;
        console.log("Your answer was true\n");
    }
    else
    {
        answers[i] = false;
        console.log("Your answer was false\n");
    }
}

// Use the given answers to calculate the score as a decimal.
var correctAnswers = 0;
for (var i = 0; i < answers.length; i++)
{
    if (answers[i])
    {
        correctAnswers++;
    }
}
var testScore = correctAnswers / answers.length;

// Finally, output the score of the assessment as a rounded percentage.
{
    console.log("\nAssessment finished: Your score is " + Math.round(testScore * 100) + "%.");
}
