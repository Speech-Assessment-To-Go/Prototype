//MUST BE RAN AS "node --experimental-json-modules .\nogui.js" in terminal for this to work!

import Database from '../Database.js';


//Load Database!
var assessments = Database.LoadAssessments();

console.log(assessments);