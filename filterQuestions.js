
import Database from './Database';

let allQuestions = Database.LoadQuestions();

export function filterQuestions(number, structure, complexity, pastQuestions = []) {
	/*
	* Parameters:
		* number, an integer, is how many questions are being added in the current filter (based on checkbox choices on-screen).
		* structure, a string / enumerated type, is the structure of a question (WH questions, for example).
		* complexity, an integer / enumerated type, is the level of complexity of the question (1 through 4).
	* Returns: an array of question ids that fit the filters.
	*/
	
	let addedQuestions = []; //return array of questions ids that fit the filters
	//let pastQuestions = []; //questions that have been referenced already (instead of having a growing array, should we change it to an array of length allQuestions.length and shrink it?
	let i = 0;
	let questionCount = 0;
	
	while (pastQuestions.length < allQuestions.length && questionCount < number) { //while we haven't exhausted our list of questions and we haven't reached the requested number
		
		while (pastQuestions.includes(i)) { //if we've already evaluated this question, choose a different one 
			i = Math.floor(Math.random() * allQuestions.length);
		}
		
		if (allQuestions[i].structure == structure && allQuestions[i].complexity == complexity) { //if it fits the filters, add the index (id)
			addedQuestions.push(i);

			questionCount++;
		}
		
		pastQuestions.push(i); //note that we've looked at this question

				
	}
	
	if (addedQuestions.length < number) { //if there weren't enough questions that fit
		console.log("Not enough questions that fit these filters.");
	}
	
	return addedQuestions;

}
