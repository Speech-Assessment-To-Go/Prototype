import { QuestionData } from './QuestionData.js'

export class Student
{
    constructor(firstName = 'NULL', lastName = 'NULL', ethnicity = 'NULL', school = 'NULL', birth = 'NULL', language = 'NULL', grade = 5, id = "-1")
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ethnicity = ethnicity;
        this.school = school;
        this.birth = birth;
        this.language = language;
        this.grade = grade;
        this.id = -1;
        this.middleName;
        this.fullName = firstName + ' ' + lastName;
        this.notes = '';
        
        this.assessmentData = [];
        
    }
}
