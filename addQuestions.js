function addQuestions(allQuestions, number, structure, content, tags) {
	/*
	* Parameters:
		* allQuestions is a stand in for whatever structure holds all our questions. Is there a data structure that holds all the questions? the questions by structure (or some other subdivision)?
		* number, an integer, is how many questions are being added in the current filter (based on checkbox choices on-screen).
		* structure, a string / enumerated type, is the structure of a question (WH questions, for example).
		* content, a string / enumerated type, is what the question is about (personal experience, general knowledge).
		* tags, an array of strings / enumerated types, are other miscellaneous things (complexity of questions / age range, sounds, etc.)
	* Returns: an array (or other data structure?) of questions that fit the filters.
	*/
	
	let addedQuestions = [];
	let isValid = true;
	let questionCount = 0;

	//counting through all questions. This is probably a super terrible way to do it.
	for (i = 0; i < allQuestions.length && questionCount < number; i++) {
		isValid = true;
		if (allQuestions[i].structure == structure && allQuestions[i].content == content) {
			
			//if there are no tags, add the question
			if (tags === undefined || tags.length == 0) {
				addedQuestions.push(allQuestions[i]);
				questionCount++;
			}
			//if there are tags, make sure that each tag is present in the nominated question before adding it
			else {
				for (j = 0; j < tags.length; j++) {
					if (!allQuestions[i].tags.includes(tags[j]))
						isValid = false;
				}
				if (isValid) {
					addedQuestions.push(allQuestions[i]);
					questionCount++;
				}
			}
		}
	}
	
	if (questionCount < number) {
		console.log("Not enough questions that fit these filters.");
	}
	
	return addedQuestions;

}
