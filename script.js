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
// -------------------------
function getLearnerData(course, ag, submissions) {
  try {
    if (course.id !== ag.course_id) {  //  Check if assignment group matches the course
      throw new Error("Assignment group does not match course!");
    }
// Filter out assignments that are not due yet
    const now = new Date(); // today's date
    const validAssignments = ag.assignments.filter((a) => {
      const dueDate = new Date(a.due_at);
      return dueDate <= now; // only include if already due
    });

    // Create a quick lookup object for assignment info by ID
    const assignmentMap = {};
    for (let a of validAssignments) {
      assignmentMap[a.id] = a;
    }

    // Group submissions by learner
    const learnerMap = {};
    for (let sub of submissions) {
      const id = sub.learner_id;
      if (!learnerMap[id]) {
        learnerMap[id] = [];
      }
      learnerMap[id].push(sub);
    }

    // Process each learner’s submissions
    const result = [];

    for (let learnerId in learnerMap) {
      const learnerSubs = learnerMap[learnerId];

      let totalScore = 0;
      let totalPossible = 0;
      const assignmentScores = {};

      for (let sub of learnerSubs) {
        const assignment = assignmentMap[sub.assignment_id];
        if (!assignment) continue; // skip if assignment is not valid

        const dueDate = new Date(assignment.due_at);
        const submitDate = new Date(sub.submission.submitted_at);

        let score = sub.submission.score;
        const possible = assignment.points_possible;

        // Skip if points_possible is zero to avoid divide-by-zero
        if (possible === 0) continue;

        // Deduct 10% if late
        if (submitDate > dueDate) {
          score *= 0.9; // reduce score by 10%
        }

        //  Calculate percentage score
        const percent = score / possible;

        //  Store percentage score with assignment ID as key
        assignmentScores[assignment.id] = Number(percent.toFixed(3));

        // Add to total for average calculation
        totalScore += score;
        totalPossible += possible;
      }

      //  Final average = totalScore / totalPossible
      const avg = totalPossible > 0 ? totalScore / totalPossible : 0;

      //  Add learner result to final array
      result.push({
        id: Number(learnerId),
        avg: Number(avg.toFixed(3)),
        ...assignmentScores,
      });
    }

    return result;
  } catch (error) {
    console.error("Error processing learner data:", error.message);
    return [];
  }
}

// add readme breaksown!!

// -------------------------
// SECTION 5: Run and Output
// -------------------------
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

