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
        this.questions.push(new Question(question, img));
    }
}
