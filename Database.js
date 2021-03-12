import schoolsDB from './database/Schools.json';
import questionsDB from './database/Questions.json';
import assessmentsDB from './database/Assessments.json'



// import fs from 'fs';
// import { Student } from './Student.js';
// import { School } from './School.js'

class Database {
    constructor() {   }

    LoadSchools()
    {
        // console.log("TEST PARSE!");
        // console.log(schoolsDB);

        var jsonString = JSON.stringify(schoolsDB);
        var schools = JSON.parse(jsonString);

        return schools;
    }

    LoadAssessments()
    {
        var jsonString = JSON.stringify(assessmentsDB);
        var assessments = JSON.parse(jsonString);

        return assessments;
    }

    LoadQuestions()
    {
        var jsonString = JSON.stringify(questionsDB);
        var questions = JSON.parse(jsonString);

        return questions;
    }
  }
  
  export default (new Database);