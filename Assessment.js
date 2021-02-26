import { Question } from './Question.js'

export class Assessment
{
    constructor(name, questions)
    {   
        this.name = name;
        this.questions = questions;
    }

    AddQuestion(question, img)
    {
        const MAX = 100;
        if (this.questions.length >= MAX)
        {
            console.log("Maximum Questions reached: " + MAX)
            return false;
        }

        this.questions.push(new Question(question, img));
        return true; // That it was successful
    }

    
}
