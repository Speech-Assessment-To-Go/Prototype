import { QuestionData } from './QuestionData.js'

export class AssessmentData
{
    constructor(questionData, dateTaken, name = "_NAME")
    {   
        this.name = name;
        this.dateTaken= dateTaken;
        //this.questions = questions; //IDS of the questions

        this.questionData=questionData;//List of question data (date, notes, scaffolding, etc)

        this.slp = "SLP's Name";

    }
   
}
