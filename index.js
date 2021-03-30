const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const employees = [];

function initGenerator() {
    beginHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([{
        message: "Please enter the member name",
        name: "name"
    },
    {
        type: "list",
        message: "Please enter the member role",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
        ],
        name: "role"
    },
    {
        message: "Please enter the member id",
        name: "id",
    },
    {
        message: "Please enter the member email",
        name: "email"
    }])
        .then(function ({ name, role, id, email }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "Github username";
            } else if (role === "Intern") {
                roleInfo = "school name";
            } else {
                roleInfo = "office phone number";
            }
            inquirer.prompt([{
                message: `Please enter member ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add a member to this team?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "anotherMember"
            }])
                .then(function ({ roleInfo, anotherMember }) {
                    let newMember;
                    if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, roleInfo);
                    } else if (role === "Intern") {
                        newMember = new Intern(name, id, email, roleInfo);
                    } else {
                        newMember = new Manager(name, id, email, roleInfo)
                    }
                    employees.push(newMember);
                    addHtml(newMember)
                        .then(function () {
                            if (anotherMember === "yes") {
                                addMember();
                            } else {
                                generateHtml();
                            }
                        });

                });
        });
}
console.log("hello world");

function beginHtml() {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Team Profile Generator</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="style.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>

<div class="jumbotron">
  <div class="container text-center">
    <h1>My Team</h1>      
  </div>
</div>

<div class="container">    
  <div class="row">`;

    fs.writeFile("./sample/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Begin Team Profile Generator");
}

function addHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data =
                `<div class="col-sm-4"> 
       <div class="panel panel-primary">
         <h5 class="panel-heading">${name}<br /><br />Engineer</h5>
         <div class="panel-body"><img src="../img/engineer.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
        <ul class="list-group list-group-flush">
             <li class="list-group-item">ID: ${id}</li>
             <li class="list-group-item">Email Address: ${email}</li>
         </ul>
         <div class="panel-footer">Github: ${gitHub}</div>
         <figcaption class="text-center">Photo by <a href="https://unsplash.com/@heidifin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Heidi Fin</a> on <a href="https://unsplash.com/t/architecture?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
       </div>
     </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data =
                `<div class="col-sm-4"> 
       <div class="panel panel-primary">
         <h5 class="panel-heading">${name}<br /><br />Intern</h5>
         <div class="panel-body"><img src="../img/intern.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
        <ul class="list-group list-group-flush">
             <li class="list-group-item">ID: ${id}</li>
             <li class="list-group-item">Email Address: ${email}</li>
         </ul>
         <div class="panel-footer">School: ${school}</div>
         <figcaption class="text-center">Photo by <a href="https://unsplash.com/@matt__feeney?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">matthew Feeney</a> on <a href="https://unsplash.com/t/architecture?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
       </div>
     </div>`;

        } else {
            const officePhone = member.getOfficeNumber();
            data =
                `<div class="col-sm-4"> 
       <div class="panel panel-primary">
         <h5 class="panel-heading">${name}<br /><br />Manager</h5>
         <div class="panel-body"><img src="../img/manager.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
        <ul class="list-group list-group-flush">
             <li class="list-group-item">ID: ${id}</li>
             <li class="list-group-item">Email Address: ${email}</li>
         </ul>
         <div class="panel-footer">Office Phone: ${officePhone}</div>
         <figcaption class="text-center">Photo by <a href="https://unsplash.com/@ajaegers?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Arnaud Jaegers</a> on <a href="https://unsplash.com/t/architecture?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
       </div>
     </div>`;
        }

        console.log("Member has been added successfully!");
        fs.appendFile("./sample/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}


function generateHtml() {
    const html = `</div>
    </div>

    </body>
    </html>`;

    fs.appendFile("./sample/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("End Team Profile Generator");
}
initGenerator();