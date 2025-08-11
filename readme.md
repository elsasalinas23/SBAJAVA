A CourseInfo object, which looks like this:
{
  "id": number,
  "name": string,
}

An AssignmentGroup object, which looks like this:
{
  "id": number,
  "name": string,
  "course_id": number,  // the ID of the course the assignment group belongs to
  "group_weight": number, // the percentage weight of the entire assignment group
  "assignments": [AssignmentInfo],
}

Each AssignmentInfo object within the assignments array looks like this:
{
  "id": number,
  "name": string,
  "due_at": Date string, // the due date for the assignment
  "points_possible": number,  // the maximum points possible for the assignment
}

An array of LearnerSubmission objects, which each look like this:
{
    "learner_id": number,
    "assignment_id": number,
    "submission": {
      "submitted_at": Date string,
      "score": number
    }
}

{
    // the ID of the learner for which this data has been collected
    "id": number,
    // the learner’s total, weighted average, in which assignments
    // // with more points_possible should be counted for more
    // // ** e.g. a learner with 50/100 on one assignment and 190/200 on another
    // // ** would have a weighted average score of 240/300 = 80%.
    
    
    "avg": number,
    // each assignment should have a key with its ID,
    // and the value associated with it should be the percentage that
    // the learner scored on the assignment (submission.score / points_possible)
    
    
    <assignment_id>: number,
    // if an assignment is not yet due, it should not be included in either
    // the average or the keyed dictionary of scores
}




    //===================================================
     // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;



spent the weekend re watchihng lesson of the week also OH 
thank you for all the input i hope i met at leat the basic 
all feedback is welcomed 
used; codeacadamy, chatgpt, google search 
