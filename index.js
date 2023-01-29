var _a;
var localStorageCourses = window.localStorage.getItem("myCourses");
var courses;
if (localStorageCourses != null) {
    courses = JSON.parse(localStorageCourses);
    courses.forEach(function (course) {
        course.start = new Date(course.start);
        course.finish = new Date(course.finish);
    });
    // console.log(courses);
}
else {
    courses = [
        {
            name: "JS",
            description: "From zero to hero.",
            start: new Date("01-15-2023"),
            finish: new Date("03-15-2023")
        },
        {
            name: "React",
            description: "Improve your skills.",
            start: new Date("03-15-2023"),
            finish: new Date("04-15-2023")
        },
        {
            name: "TS",
            description: "Become a pro.",
            start: new Date("01-15-2023"),
            finish: new Date("01-20-2023")
        },
    ];
    // console.log(courses);
}
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var myUser = {
    name: "Cremilde da Silva",
    email: "cremilde@mail.pt",
    profession: "Front-end developer",
    city: "Lisbon",
    gender: "Female",
    img: "student_photo.jpg"
};
// USER SECTION
var studentElement = document.createElement("div");
studentElement.setAttribute("class", "student-info");
studentElement.innerHTML = "\n<div class=\"student-info\"><img class=\"student-image\" src=\"".concat(myUser.img, "\" alt=\"picture of ").concat(myUser.name, "\"></div>\n<div class=\"student-info\"><label>Name: </label><span>").concat(myUser.name, "</span></div>\n<div class=\"student-info\"><label>Email: </label><span>").concat(myUser.email, "</span></div>\n<div class=\"student-info\"><label>Profession: </label><span>").concat(myUser.profession, "</span></div>\n<div class=\"student-info\"><label>City: </label><span>").concat(myUser.city, "</span></div>\n<div class=\"student-info\"><label>Gender: </label><span>").concat(myUser.gender, "</span></div>\n");
(_a = document.querySelector(".student-container")) === null || _a === void 0 ? void 0 : _a.appendChild(studentElement);
// AGENDA SECTION
function displayAgenda(courses) {
    var _a;
    // Cleaning whatever is inside agenda.container div
    var agendaContainer = document.querySelector(".agenda-container");
    if (agendaContainer != null) {
        agendaContainer.innerHTML = "";
    }
    var agendaElement = document.createElement("div");
    var today = new Date();
    var monthName = months[today.getMonth()];
    var monthsTableHeader = months.map(function (month) {
        if (monthName === month)
            return "<th class=\"current-month\">".concat(month, "</th>");
        else
            return "<th>".concat(month, "</th>");
    });
    var coursesTable = courses.map(function (course) {
        var courseStart = course.start.getMonth();
        var courseFinish = course.finish.getMonth();
        var tableData = [];
        tableData.push("<tr></tr>");
        for (var i = 0; i < 12; i++) {
            if (i === courseStart && i === courseFinish) {
                courseFinish === today.getMonth()
                    ? tableData.push("<td class=\"last-month\">".concat(course.name, " - Start + End</td>"))
                    : tableData.push("<td>".concat(course.name, " - Start + End</td>"));
            }
            else if (i === courseFinish) {
                courseFinish === today.getMonth()
                    ? tableData.push("<td class=\"last-month\">".concat(course.name, " - End</td>"))
                    : tableData.push("<td>".concat(course.name, " - End</td>"));
            }
            else if (i === courseStart) {
                tableData.push("<td>".concat(course.name, " - Start</td>"));
            }
            else {
                tableData.push("<td></td>");
            }
        }
        tableData.push("<tr></tr>");
        return tableData.join("");
    });
    agendaElement.innerHTML = "\n  <table>\n    <tr>\n    ".concat(monthsTableHeader.join(""), "\n    </tr>\n    ").concat(coursesTable.join(""), "\n  </table>\n  ");
    (_a = document.querySelector(".agenda-container")) === null || _a === void 0 ? void 0 : _a.appendChild(agendaElement);
}
function addCourse(event) {
    event.preventDefault();
    var formCourse = document.querySelector("#form-course");
    var formDescription = document.querySelector("#form-description");
    var formStartDate = document.querySelector("#form-start-date");
    var formFinishDate = document.querySelector("#form-finish-date");
    var formCourseValue = formCourse != null ? formCourse.value : "NA";
    var formDescriptionValue = formDescription != null ? formDescription.value : "NA";
    var formStartDateValue = formStartDate != null ? formStartDate.value : "NA";
    var formFinishDateValue = formFinishDate != null ? formFinishDate.value : "NA";
    var newCourse = {
        name: formCourseValue,
        description: formDescriptionValue,
        start: new Date(formStartDateValue),
        finish: new Date(formFinishDateValue)
    };
    courses.push(newCourse);
    window.localStorage.setItem("myCourses", JSON.stringify(courses));
    displayAgenda(courses);
}
displayAgenda(courses);
// The syntax for removing the localStorage item is as follows:
// localStorage.removeItem('myCourses');
