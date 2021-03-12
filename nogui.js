//MUST BE RAN AS "node --experimental-json-modules .\nogui.js" in terminal for this to work!

import Database from './Database.js';
import { Student } from './Student.js';
import { School } from './School.js'
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const r2 = readline.createInterface({
input: process.stdin,
output: process.stdout
});
  

//Load Database!
var schools = Database.LoadSchools();

console.log(schools);

for (var i = 0; i < schools.length; i++)
{
    var student = schools[i].students[0] instanceof Student;
   
    console.log(i + '\t ' + student);
}

// var schoolsObj = [ ]

var questions = Database.LoadQuestions();
var assessments = Database.LoadAssessments();

//--------------------------------------------

// ******* Prompts *******

//*********** SCHOOL SCREEN ***************
console.log("Schools in Database")

for (var i = 0; i < schools.length; i++)
{
    var name = schools[i].name;
    console.log(i + '\t ' + name + ' Elementary School');
}


var schoolSelected = 0;
rl.question('Select a school:  ', (answer) => {
    schoolSelected =  parseInt(answer); 

    var schoolName = schools[schoolSelected].name;

    console.log(`Selected: ${schoolName}` + ' Elementary School');
  
    rl.close();
  });

  console.log('\n');
//*********** STUDENT SCREEN ***************


// //Lists Students
// for (var i = 0; i < schools[schoolSelected].students.length; i++)
// {
//     var student = schools[schoolSelected].students[i];
//     console.log(i + '\t ' + student);
// }

// //User Input
// rl.question('Select a Student:  ', (answer) => {
//     var studentSelected =  parseInt(answer); 

//     var studentName = schools[selection].students[studentSelected];

//     console.log(`Selected: ${studentName}`);
  
//     rl.close();
//   });


