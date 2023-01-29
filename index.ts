type User = {
  name: string;
  email: string;
  profession: string;
  city: string;
  gender: string;
  img?: string;
};

type Course = {
  name: string;
  description: string;
  start: Date;
  finish: Date;
};

let localStorageCourses = window.localStorage.getItem("myCourses");

let courses: Course[];

if (localStorageCourses != null) {
  courses = JSON.parse(localStorageCourses);
  courses.forEach((course) => {
    course.start = new Date(course.start);
    course.finish = new Date(course.finish);
  });
  // console.log(courses);
} else {
  courses = [
    {
      name: "JS",
      description: "From zero to hero.",
      start: new Date("01-15-2023"),
      finish: new Date("03-15-2023"),
    },
    {
      name: "React",
      description: "Improve your skills.",
      start: new Date("03-15-2023"),
      finish: new Date("04-15-2023"),
    },
    {
      name: "TS",
      description: "Become a pro.",
      start: new Date("01-15-2023"),
      finish: new Date("01-20-2023"),
    },
  ];
  // console.log(courses);
}

let months: string[] = [
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

let myUser: User = {
  name: "Cremilde da Silva",
  email: "cremilde@mail.pt",
  profession: "Front-end developer",
  city: "Lisbon",
  gender: "Female",
  img: "student_photo.jpg",
};

// USER SECTION
const studentElement = document.createElement("div");
studentElement.setAttribute("class", "student-info");

studentElement.innerHTML = `
<div class="student-info"><img class="student-image" src="${myUser.img}" alt="picture of ${myUser.name}"></div>
<div class="student-info"><label>Name: </label><span>${myUser.name}</span></div>
<div class="student-info"><label>Email: </label><span>${myUser.email}</span></div>
<div class="student-info"><label>Profession: </label><span>${myUser.profession}</span></div>
<div class="student-info"><label>City: </label><span>${myUser.city}</span></div>
<div class="student-info"><label>Gender: </label><span>${myUser.gender}</span></div>
`;
document.querySelector(".student-container")?.appendChild(studentElement);

// AGENDA SECTION
function displayAgenda(courses: Course[]): void {
  // Cleaning whatever is inside agenda.container div
  let agendaContainer = document.querySelector(
    ".agenda-container"
  ) as HTMLInputElement | null;
  if (agendaContainer != null) {
    agendaContainer.innerHTML = "";
  }

  const agendaElement = document.createElement("div");

  let today = new Date();
  let monthName = months[today.getMonth()];

  let monthsTableHeader = months.map((month) => {
    if (monthName === month) return `<th class="current-month">${month}</th>`;
    else return `<th>${month}</th>`;
  });

  let coursesTable = courses.map((course) => {
    let courseStart = course.start.getMonth();
    let courseFinish = course.finish.getMonth();

    let tableData = [];

    tableData.push(`<tr></tr>`);
    for (let i = 0; i < 12; i++) {
      if (i === courseStart && i === courseFinish) {
        courseFinish === today.getMonth()
          ? tableData.push(
              `<td class="last-month">${course.name} - Start + End</td>`
            )
          : tableData.push(`<td>${course.name} - Start + End</td>`);
      } else if (i === courseFinish) {
        courseFinish === today.getMonth()
          ? tableData.push(`<td class="last-month">${course.name} - End</td>`)
          : tableData.push(`<td>${course.name} - End</td>`);
      } else if (i === courseStart) {
        tableData.push(`<td>${course.name} - Start</td>`);
      } else {
        tableData.push(`<td></td>`);
      }
    }
    tableData.push(`<tr></tr>`);

    return tableData.join("");
  });

  agendaElement.innerHTML = `
  <table>
    <tr>
    ${monthsTableHeader.join("")}
    </tr>
    ${coursesTable.join("")}
  </table>
  `;
  document.querySelector(".agenda-container")?.appendChild(agendaElement);
}

function addCourse(event: KeyboardEvent): void {
  event.preventDefault();

  let formCourse = document.querySelector(
    "#form-course"
  ) as HTMLInputElement | null;
  let formDescription = document.querySelector(
    "#form-description"
  ) as HTMLInputElement | null;
  let formStartDate = document.querySelector(
    "#form-start-date"
  ) as HTMLInputElement | null;
  let formFinishDate = document.querySelector(
    "#form-finish-date"
  ) as HTMLInputElement | null;

  let formCourseValue: string = formCourse != null ? formCourse.value : "NA";
  let formDescriptionValue: string =
    formDescription != null ? formDescription.value : "NA";
  let formStartDateValue: string =
    formStartDate != null ? formStartDate.value : "NA";
  let formFinishDateValue: string =
    formFinishDate != null ? formFinishDate.value : "NA";

  let newCourse: Course = {
    name: formCourseValue,
    description: formDescriptionValue,
    start: new Date(formStartDateValue),
    finish: new Date(formFinishDateValue),
  };

  courses.push(newCourse);

  window.localStorage.setItem("myCourses", JSON.stringify(courses));

  displayAgenda(courses);
}

displayAgenda(courses);

// The syntax for removing the localStorage item is as follows:
// localStorage.removeItem('myCourses');
