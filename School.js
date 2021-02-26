import { Student } from './Student.js';

// var students = [];

export class School
{    
    constructor(name, id = 259, type = " Elementary School")
    {
        this.name = name;
        this.students= [];
        this.id = id;
        this.type = type;
    }

    AddStudent(name)
    {
        if (this.students.length >= MAX)
        {
            console.log("Maximum Students reached: " + MAX)
            return false;
        }

        students.push( new Student(name));
        return true;
    }
}