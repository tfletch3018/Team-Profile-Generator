const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const employees = [];

function initGenerator() {
    addHtml();
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
                    addHtml(newMemeber)
                        .then(function () {
                            if (anotherMemeber === "yes") {
                                addMember();
                            } else {
                                completeHtml();
                            }
                        });

                });
        });
}
console.log("hello world");