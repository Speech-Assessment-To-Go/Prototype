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
        
    }
    get fullName(){
        return this.firstName + " " + this.lastName;
    }
}

var student1 = new Student("Alexander", "King");
var student2 = new Student("Ramil", "Hinshaw");
var student3 = new Student("Margarita", "Huerta");
var student4 = new Student("Vincent", "Meyer");
var student5 = new Student("Adriana", "Lares");
var student6 = new Student("Elliott", "Ives");
var student7 = new Student("Pablo", "Picasso");
var student8 = new Student("Kanye", "West");
var student9 = new Student("Allen", "Iverson");

var studentArray = [student1, student2, student3, student4, student5, student6, student7, student8, student9];

function studentSearch(str){

    var results = [];
    var j = 0;

    for(var i = 0; i < studentArray.length; i++){
        if(studentArray[i].fullName.includes(str)){
            results[j] = studentArray[i].fullName;
            j++;
    }
}
    return results;
}

var found = studentSearch("H");

for(var i = 0; i < found.length; i++){
    console.log(found[i]);
}
