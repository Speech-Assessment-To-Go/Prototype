import { QuestionData } from './QuestionData.js'

export class AssessmentData
{
    constructor(questionData, dateTaken)
    {   
        this.name = "ASSESSMENT NAME";
        this.dateTaken= dateTaken;
        //this.questions = questions; //IDS of the questions

        this.QuestionData=questionData;//List of question data (date, notes, scaffolding, etc)

        this.slp = "SLP's Name";

    }
   
}
