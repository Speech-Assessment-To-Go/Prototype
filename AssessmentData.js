import { QuestionData } from './QuestionData.js'

export class AssessmentData
{
    constructor(name, questionData, dateTaken)
    {   
        this.name = name;
        this.dateTaken= dateTaken;
        //this.questions = questions; //IDS of the questions

        this.QuestionData=[];//List of question data (date, notes, scaffolding, etc)

        this.slp = "SLP's Name";

    }
   
}
