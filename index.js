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
        message: "Please enter the member position",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
        ],
        name: "position"
    },
    {
        message: "Please enter the member id",
        name: "id",
    },
    {
        message: "Please enter the member email",
        name: "email"
    }])
        .then(function ({ name, position, id, email }) {
            let positionInfo = "";
            if (position === "Engineer") {
                positionInfo = "Github username";
            } else if (position === "Intern") {
                positionInfo = "school name";
            } else {
                positionInfo = "office phone number";
            }
            inquirer.prompt([{
                message: `Please enter member ${postionInfo}`,
                name: "positionInfo"
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
                .then(function ({ positionInfo, anotherMember }) {
                    let newMember;
                    if (position === "Engineer") {
                        newMember = new Engineer(name, id, email, positionInfo);
                    } else if (position === "Intern") {
                        newMember = new Intern(name, id, email, positionInfo);
                    } else {
                        newMember = new Manager(name, id, email, positionInfo)
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
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
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
  <div class="row">
    <div class="col-sm-4">
      <div class="panel panel-primary">
        <div class="panel-heading">Text</div>
        <div class="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image"></div>
        <div class="panel-footer">Text</div>
      </div>
    </div>
    <div class="col-sm-4"> 
      <div class="panel panel-danger">
        <div class="panel-heading">text</div>
        <div class="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image"></div>
        <div class="panel-footer">Text</div>
      </div>
    </div>
    <div class="col-sm-4"> 
      <div class="panel panel-success">
        <div class="panel-heading">text</div>
        <div class="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image"></div>
        <div class="panel-footer">text</div>
      </div>
    </div>
  </div>
</div><br>

<div class="container">    
  <div class="row">
    <div class="col-sm-4">
      <div class="panel panel-primary">
        <div class="panel-heading">text</div>
        <div class="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image"></div>
        <div class="panel-footer">text</div>
      </div>
    </div>
    <div class="col-sm-4"> 
      <div class="panel panel-primary">
        <div class="panel-heading">text</div>
        <div class="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image"></div>
        <div class="panel-footer">text</div>
      </div>
    </div>
    <div class="col-sm-4"> 
      <div class="panel panel-primary">
        <div class="panel-heading">text</div>
        <div class="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image"></div>
        <div class="panel-footer">text</div>
      </div>
    </div>
  </div>
</div><br><br>
</body>
</html>`;
fs.writeFile("./test/test.html", html, function(err) {
    if (err) {
        console.log(err);
    }
});
console.log("start");
}

