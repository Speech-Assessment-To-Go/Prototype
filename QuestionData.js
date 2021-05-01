//USED TO STORE PAST QUESTION DATA OF ASSESSMENTS

export class QuestionData
{
    constructor(id, correctness = false, notes = '', scaffolding = 0)
    {
        this.id = id;

        this.correctness = correctness;
        this.notes = notes;

        this.scaffolding = scaffolding;
    }
}
