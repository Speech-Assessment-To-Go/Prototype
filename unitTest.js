import { School } from './School.js';
import { Student } from './Student.js';
import { Assessment } from './Assessment.js';
import { Question } from './Question.js';

// ---------TESTING SCHOOLS -------------------------------------
console.log();
Test_School();
Test_Students();
Test_Assessments();
Test_Questions();


console.log();

console.log("School Size Constraint set too: 100" );
console.log("Student Size Constraint set too: 5000" );
console.log("Assessment Size Constraint set too: 30" );
console.log("Question Size Constraint set too: 100" );



// // ---------TESTING ASSESSMENTS -------------------------------------
// var assessments = [];
// const MAX_ASSESSMENT = 30;


// while (true)
// {
//     if (this.students.length >= MAX)
//     {
//         console.log("ERROR! Maximum Students reached: " + MAX)
//         return;
//     }
// }




function Test_School()
{
    console.log("UNIT TESTING SIZE LIMITS OF SCHOOL\n");
    const MAX = 100;
    var students = [];
    
    for (var i = 0; i < MAX; i++)
    {
        if (i>= MAX)
        {
            //students.push( new Student('a','a','a','a','a','a','a'));
            // console.log("ERROR! Maximum Schools reached: " + MAX)
            return;
        }
    
        else{
            console.log("Added School " + i);
        }
    }

    console.log("ERROR! Maximum Schools reached: " + MAX)
    console.log();
}

function Test_Students()
{
    console.log("UNIT TESTING SIZE LIMITS OF STUDENT\n");
    const MAX = 5000;
    var students = [];
    
    for (var i = 0; i < MAX; i++)
    {
        if (i>= MAX)
        {
            //students.push( new Student('a','a','a','a','a','a','a'));
            console.log("ERROR! Maximum Students reached: " + MAX)
            return;
        }
    
        else{
            console.log("Added Student " + i);
        }
    }

    console.log("ERROR! Maximum Students reached: " + MAX)
    console.log();
}

function Test_Assessments()
{
    console.log("UNIT TESTING SIZE LIMITS OF ASSESSMENTS\n");
    const MAX = 30;
    var students = [];
    
    for (var i = 0; i < MAX; i++)
    {
        if (i>= MAX)
        {
            //students.push( new Student('a','a','a','a','a','a','a'));
            console.log("ERROR! Maximum Assessments reached: " + MAX)
            return;
        }
    
        else{
            console.log("Added Assessments " + i);
        }
    }

    console.log("ERROR! Maximum Assessments reached: " + MAX)
    console.log();
}

function Test_Questions()
{
    console.log("UNIT TESTING SIZE LIMITS OF QUESTION\n");
    const MAX = 100;
    var students = [];
    
    for (var i = 0; i < MAX; i++)
    {
        if (i>= MAX)
        {
            //students.push( new Student('a','a','a','a','a','a','a'));
            console.log("ERROR! Maximum Questions reached: " + MAX)
            return;
        }
    
        else{
            console.log("Added Question " + i);
        }
    }

    console.log("ERROR! Maximum Questions reached: " + MAX)
    console.log();
}