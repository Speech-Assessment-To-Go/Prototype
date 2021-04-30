//USED TO STORE PAST QUESTION DATA OF ASSESSMENTS

export class QuestionData
{
    constructor(questionID, correctness, notes, scaffolding)
    {
        this.questionID = questionID;

        this.correctness = correctness;
        this.notes = notes;

        this.scaffolding = scaffolding;
    }
}
