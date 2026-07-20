let students = [
    { id: 1, name: "Somchai", score: 48 },
    { id: 2, name: "Somsri", score: 75 },
    { id: 3, name: "Sompong", score: 32 },
    { id: 4, name: "Somnak", score: 85 }
];
    let grades =[
    {id: 1, name: "A", score: 80},
    {id: 2, name: "B", score: 60},
    {id: 5, name: "F", score: 0}];

document.getElementById("src").addEventListener("click", () => {
    // Your script runs here after clicking
    const userName = prompt("Please enter your name:", "Default Name");
        if (userName !== null) {


    let score = prompt(`Please enter your score, ${userName}:`, "0");
        if (score !== null && score >= 0 && score <= 100) {
    score = parseInt(score);
    if (score >= 50) {
        alert(`You have PASSED, ${userName}!`);
    } else {
        alert(`You have FAILED, ${userName}.`);
    }
    } else {
        alert("Invalid score. Please enter a number between 0 and 100.");
    }
    } else {
        alert("Input was canceled.");
    }

    console.log("Button clicked!");//checking if the button click is working
});

document.getElementById("For").addEventListener("click", () => {
    
    students.forEach(student => {
        console.log(`Student: ${student.name}, Score: ${student.score}`);
    });
    alert(`Students and their scores:`);

    for (let i = 0; i < students.length; i++) {
        if (students[i].score >= 50) {
            alert(`Student: ${students[i].name}, Score: ${students[i].score} is passing.`);
            console.log(`Student: ${students[i].name}, Score: ${students[i].score} is passing.`);
        } else {
            alert(`Student: ${students[i].name}, Score: ${students[i].score} is failing.`);
            console.log(`Student: ${students[i].name}, Score: ${students[i].score} is failing.`);
        }
    }
});


document.getElementById("while").addEventListener("click", () => {

    alert(`Students and their scores:`);

    let i = 0;
    while (i < students.length) {
        if (students[i].score >= 50) {
           
            console.log(`Score ${students[i].score} is passing.`); alert(`Score ${students[i].score} is passing.`);
        } else {
            
            console.log(`Score ${students[i].score} is failing.`);alert(`Score ${students[i].score} is failing.`);
        }
        i++;
    }
});

document.getElementById("push").addEventListener("click", () => {
    const newName = prompt("Please enter the student's name:");
    const newScore = prompt("Please enter the student's score:", "0");
    if (newName && newScore !== null && newScore >= 0 && newScore <= 100) {
        students.push({ id: students.length + 1, name: newName, score: parseInt(newScore) });
        console.log(`New student added: ${newName}, Score: ${newScore}`);
        alert(`New student added: ${newName}, Score: ${newScore}`);
        alert(`New student added: ${newName}, Score: ${newScore}`);
    } else {
        alert("Invalid input. Please enter a valid name and score.");
    }
});

document.getElementById("pop").addEventListener("click", () => {
    if (students.length > 0) {
        const removedStudent = students.pop();
        console.log(`Removed student: ${removedStudent.name}, Score: ${removedStudent.score}`);
        alert(`Removed student: ${removedStudent.name}, Score: ${removedStudent.score}`);
    } else {
        alert("No students to remove.");
    }
});

document.getElementById("include").addEventListener("click", () => {
    const searchName = prompt("Please enter the student's name to search:");
    if (searchName) {
        const foundStudent = students.find(student => student.name.toLowerCase() === searchName.toLowerCase());
        if (foundStudent) {
            console.log(`Student found: ${foundStudent.name}, Score: ${foundStudent.score}`);
            alert(`Student found: ${foundStudent.name}, Score: ${foundStudent.score}`);
        } else {
            console.log(`Student not found: ${searchName}`);
            alert(`Student not found: ${searchName}`);
        }
    }
});

document.getElementById("sort").addEventListener("click", () => {
    students.sort((a, b) => a.score - b.score);
    console.log("Students sorted by score (ascending):");
    students.forEach(student => {
        console.log(`Student: ${student.name}, Score: ${student.score}`);
    });
    alert("Students sorted by score (ascending). Check the console for details.");
});

document.getElementById("map").addEventListener("click", () => {
    students.map(student => {
        student.score = student.score + student.score ; // double the score
        console.log(`Student: ${student.name}, Score: ${student.score}`);
        alert(`Student: ${student.name}, Score: ${student.score}`);
    });
        students.forEach(student => {
        let grade = grades.find(g => student.score >= g.score);
        console.log(`Student: ${student.name}, Score: ${student.score}, Grade: ${grade.name}`);
        alert(`Student: ${student.name}, Score: ${student.score}, Grade: ${grade.name}`);
    });
});

document.getElementById("filter").addEventListener("click", () => {
    const passingStudents = students.filter(student => student.score >= 50);
    console.log("Passing students:");
    passingStudents.forEach(student => {
        console.log(`Student: ${student.name}, Score: ${student.score}`);
    });
    alert("Passing students found. Check the console for details.");
});

document.getElementById("find").addEventListener("click", () => {
    const searchName = prompt("Please enter the student's name to search:");
    if (searchName) {
        const foundStudent = students.find(student => student.name.toLowerCase() === searchName.toLowerCase());
        if (foundStudent) {
            console.log(`Student found: ${foundStudent.name}, Score: ${foundStudent.score}`);
            alert(`Student found: ${foundStudent.name}, Score: ${foundStudent.score}`);
        } else {
            console.log(`Student not found: ${searchName}`);
            alert(`Student not found: ${searchName}`);
        }
    }
});


document.getElementById("calculate_grades").addEventListener("click", () => {
    students.forEach(student => {
        let grade = grades.find(g => student.score >= g.score);
        console.log(`Student: ${student.name}, Score: ${student.score}, Grade: ${grade.name}`);
        alert(`Student: ${student.name}, Score: ${student.score}, Grade: ${grade.name}`);
    });
});

document.getElementById("LetPlay").addEventListener("click", () => {
    let destinyNumber = prompt("Please enter your destiny:", "Number");
    let RandomNumber = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6
    console.log(`Your destiny number: ${destinyNumber}`);
    console.log(`Random number generated: ${RandomNumber}`);
    if (destinyNumber == RandomNumber) {
        alert(`Congratulations! Your destiny number matches the random number: ${RandomNumber}`);
        console.log(`Congratulations! Your destiny number matches the random number: ${RandomNumber}`);
    } else {
        alert(`Sorry, your destiny number does not match the random number`);
        console.log(`Sorry, your destiny number does not match the random number: ${RandomNumber}`);
    }
});