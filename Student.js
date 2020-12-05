export class Student
{
    constructor(firstName, lastName, ethnicity, school, birth, language, grade = 5)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ethnicity = ethnicity;
        this.school = school;
        this.birth = birth;
        this.language = language;
        this.grade = grade;
    }
}
