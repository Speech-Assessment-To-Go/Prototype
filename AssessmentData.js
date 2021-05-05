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

        this.score;

        this.totalScaffolding = 0;

        this.grading=[];

        //Scoring
        this.attention = '1';
        this.performance = '1';
        this.planning = '1';
        this.awareness = '1';
        this.motivation = '1';
        this.interaction = '1';
    }   
}
