// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];
// SECTION 4: Main Function
function getLearnerData(course, ag, submissions) {
  try {
    // 1. Make sure the assignment group belongs to the same course
    if (course.id !== ag.course_id) {
      throw new Error("Assignment group does not match course!");
    }

    // 2. Make a quick "dictionary" of assignments by their ID
    const assignmentById = {};
    for (const a of ag.assignments) { // loop type 1: for..of
      assignmentById[a.id] = a;
    }

    // 3. This will store all learner info as we go
    const learners = {}; // example: { "125": { totalScore: 0, totalPossible: 0, scores: {} } }

    // 4. MASTER LOOP – Go through every submission one-by-one
    for (const sub of submissions) { // loop type 1 again
      const learnerId = sub.learner_id;
      const assignment = assignmentById[sub.assignment_id];

      // Skip if assignment not found
      if (!assignment) continue; // loop control keyword

      // Skip if the assignment is not due yet
      const now = new Date();
      const dueDate = new Date(assignment.due_at);
      if (dueDate > now) continue; // skip to next submission

      // Get the score and possible points
      let score = sub.submission.score;
      const possible = assignment.points_possible;

      // Skip if possible points are 0 (avoid division error)
      if (possible === 0) continue;

      // If late, take off 10% from the score
      const submitDate = new Date(sub.submission.submitted_at);
      if (submitDate > dueDate) {
        score = score * 0.9;
      }

      // If this learner doesn't exist yet, create their record
      if (!learners[learnerId]) {
        learners[learnerId] = { totalScore: 0, totalPossible: 0, scores: {} };
      }

      // Calculate percent for this assignment
      const percent = score / possible;

      // Store the percent (rounded to 3 decimal places) using the assignment ID
      learners[learnerId].scores[assignment.id] = Number(percent.toFixed(3));

      // Add to their totals (for weighted average)
      learners[learnerId].totalScore += score;
      learners[learnerId].totalPossible += possible;
    }

    // 5. Turn the learners object into the final result array
    const result = [];
    for (const id in learners) { // loop type 2: for..in
      const L = learners[id];
      const avg = L.totalPossible > 0 ? L.totalScore / L.totalPossible : 0;

      // Push this learner's info into the result
      result.push({
        id: Number(id),
        avg: Number(avg.toFixed(3)),
        ...L.scores
      });
    }

    // 6. Return the final array of learners
    return result;
  } catch (err) {
    // If something goes wrong, log the message and return empty array
    console.error("Error:", err.message);
    return [];
  }
}
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);