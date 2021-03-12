//MUST BE RAN AS "node --experimental-json-modules .\nogui.js" in terminal for this to work!


import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  


var firstNames = ['John', 'Bill', 'Jannet', 'Tommy', 'Sammy', 'Rachel'];
var lastNames = ['Smith', 'Baker', 'Meyer', 'Jones', 'Avadan', 'King'];

var students = []

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  
//--------------------------------------------


const MAX_STUDENTS = 50;
//Generate Random Students for each School
for (var k = 0; k < MAX_STUDENTS; k++)
{
    var fName = firstNames[ getRandomInt(0, firstNames.length)];
    var lName = lastNames[ getRandomInt(0, lastNames.length)];
    // var student = new Student(fName, lName);

    students.push(fName + ' ' + lName);
    console.log(fName + ' ' + lName);
}




//Accept Input
var input;
rl.question('Type something:  ', (answer) => {

    input = answer;
  
    rl.close();
  });




