import Student from './Student';

// var student1 = new Student("Alexander", "King");
// var student2 = new Student("Ramil", "Hinshaw");
// var student3 = new Student("Margarita", "Huerta");
// var student4 = new Student("Vincent", "Meyer");
// var student5 = new Student("Adriana", "Lares");
// var student6 = new Student("Elliott", "Ives");
// var student7 = new Student("Pablo", "Picasso");
// var student8 = new Student("Kanye", "West");
// var student9 = new Student("Allen", "Iverson");

// var studentArray = [student1, student2, student3, student4, student5, student6, student7, student8, student9];
export function filterStudents(str, students){

    // console.log(str);
    var results = [];
    //var j = 0;

    str = str.trim();

    if(str == "" || str == 'NULL'){
        return results;
    }

    str = str.toLowerCase();

    for(var i = 0; i < students.length; i++){
        if(students[i].fullName.toLowerCase().includes(str) == true){
            results.push(i); //ToDo: CHANGE TO INTS INSTEAD LATER
            //j++;
    }
}
    return results;
}

// var found = filterStudents("Iv");

// for(var i = 0; i < found.length; i++){
//     console.log(found[i]);
// }
