import * as d3 from "d3"; //comment for github

var employeePromise = d3.json("data/employeeID.json");

var successFCN = function (employee) {
  console.log(employee);

  var emp = d3
    .select("body")
    .append("div")
    .data(employee)
    .enter()
    .append("div")
    .classed("general", true);

  emp
    .append("span")
    .classed("ename", true)
    .text(function (employees) {
      return employees.firstName + " " + employees.lastName;
    });
  emp.append("img").attr("src", function (employees) {
    return employees.photo;
  });

  d3.selectAll("img").on("mouseover", function (eventData, employee) {
    console.log("enter");
    d3.select(".hidden").style("display", "block");
    d3.select(".hidden").text(
      "Title: " +
        employee.title +
        " | Department: " +
        employee.unit +
        " | Email: " +
        employee.email +
        " | Bio: " +
        employee.bio
    );
    console.log(employee.title);
  });

  d3.selectAll("img").on("mouseleave", function (eventData, character) {
    console.log("exit");
    d3.select(".hidden").text("");
    d3.select(".hidden").style("display", "none");
  });
};

var failFCN = function (error) {
  console.log(error);
};

employeePromise.then(successFCN, failFCN);
