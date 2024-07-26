
function createEmployeeRecord(array) {
  // Extracting the elements of the array and assigning them to variables
  let firstName = array[0];
  let familyName = array[1];
  let title = array[2];
  let payPerHour = array[3];
  let timeInEvents = [];
  let timeOutEvents = [];
    

  // Creating an object to represent the employee record
  let employeeRecord = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: timeInEvents,
    timeOutEvents: timeOutEvents
  };

  return employeeRecord; // Returning the employee record object
}
function createEmployeeRecords(arrays){
    return arrays.map(createEmployeeRecord)
}
function createTimeInEvent(employee, dateTime){
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),      
      date: date,
    });
    return employee

}
function createTimeOutEvent(employee, clockOut){
    let [date, hour] = clockOut.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt (hour, 10),      
      date: date,
    });
    return employee

}
function hoursWorkedOnDate(employee, dateWorked){
    let timeIn = employee.timeInEvents.find(event => event.date === dateWorked);
    let timeOut = employee.timeOutEvents.find(event => event.date === dateWorked);
    return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employee, dateWorked){
    return hoursWorkedOnDate(employee, dateWorked) * employee.payPerHour

}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date);
    let payable = dates.reduce((memo, date) => memo + wagesEarnedOnDate(employee, date), 0);
    return payable;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((memo, employee) => memo + allWagesFor(employee), 0);
  }