// adds jquery
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


var r = 1.5; //overtime wage is 1.5 times normal wage of $15
var hours = [];
var payments = [];

// (does not handle entries that are not integers)
function clockIn() {
  var addEmployee = true;
  while (addEmployee) {
    var entry = prompt("Enter number of hours. Repeat for multiple employees. Enter -1 to print payroll report.");
    if (entry == -1) {
      addEmployee = false;
    } else {
      hours.push(entry);
      if (entry <= 40) {
        // $15 per hour
        payments.push(15*entry);
      } else {
        // $15*40 + (entry-40)*$15*overtimeRate
        payments.push(15*40 + (entry-40)*15*r);
      }
    }
  }
  createPayroll(hours, payments);
}

function createPayroll(hoursArr, paymentsArr) {
  var tbl = document.getElementById('payrollTable');
  var len = hoursArr.length;
  var sum = 0;

  // generate table data and total pay for all employees
  for (var i = 0; i < len; i++) {
    var tr = tbl.insertRow();

    var tdNum = tr.insertCell();
    tdNum.appendChild(document.createTextNode(i+1));
    var tdHours = tr.insertCell();
    tdHours.appendChild(document.createTextNode(hoursArr[i]));
    var tdPay = tr.insertCell();
    tdPay.appendChild(document.createTextNode('$' + paymentsArr[i]));

    sum += paymentsArr[i];
  }


  $("h2").text("total pay for all employees: " + sum);

}
$(document).ready(clockIn);
