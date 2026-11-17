// Format numbers as Indian Rupees
function money(num) {
  return "₹" + Math.round(num).toLocaleString("en-IN");
}

// Show text inside the result area
function show(boxId, html) {
  document.getElementById(boxId).innerHTML = html;
}

// ---------- LOAN EMI ----------
function calculateEMI() {
  var p = Number(document.getElementById("loanAmount").value);
  var rate = Number(document.getElementById("loanRate").value);
  var years = Number(document.getElementById("loanYears").value);

  if (p <= 0 || rate <= 0 || years <= 0) {
    show("emiResult", "Please enter valid positive numbers.");
    return;
  }

  var r = rate / 12 / 100;   // monthly interest rate
  var n = years * 12;        // total months
  var emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  var total = emi * n;
  var interest = total - p;

  show("emiResult",
    "Monthly EMI: <b>" + money(emi) + "</b><br>" +
    "Total Interest: <b>" + money(interest) + "</b><br>" +
    "Total Payment: <b>" + money(total) + "</b>"
  );
}

// ---------- FIXED DEPOSIT ----------
function calculateFD() {
  var p = Number(document.getElementById("fdAmount").value);
  var rate = Number(document.getElementById("fdRate").value);
  var years = Number(document.getElementById("fdYears").value);

  if (p <= 0 || rate <= 0 || years <= 0) {
    show("fdResult", "Please enter valid positive numbers.");
    return;
  }

  // Interest compounded quarterly
  var maturity = p * Math.pow(1 + rate / 400, 4 * years);
  var earned = maturity - p;

  show("fdResult",
    "Amount Invested: <b>" + money(p) + "</b><br>" +
    "Interest Earned: <b>" + money(earned) + "</b><br>" +
    "Maturity Amount: <b>" + money(maturity) + "</b>"
  );
}

// ---------- SAVINGS GOAL ----------
function calculateGoal() {
  var name = document.getElementById("goalName").value || "your goal";
  var target = Number(document.getElementById("goalTarget").value);
  var saved = Number(document.getElementById("goalSaved").value);
  var monthly = Number(document.getElementById("goalMonthly").value);

  if (target <= 0 || monthly <= 0 || saved < 0) {
    show("goalResult", "Please enter valid numbers.");
    return;
  }

  if (saved >= target) {
    show("goalResult", "You have already reached " + name + "!");
    return;
  }

  var remaining = target - saved;
  var months = Math.ceil(remaining / monthly);

  // Date when the goal will be completed
  var date = new Date();
  date.setMonth(date.getMonth() + months);
  var dateText = date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  show("goalResult",
    "Still needed: <b>" + money(remaining) + "</b><br>" +
    "Time needed: <b>" + months + " months</b><br>" +
    "You will reach " + name + " by: <b>" + dateText + "</b>"
  );
}

// ---------- CONTACT FORM ----------
function sendMessage() {
  var name = document.getElementById("cName").value.trim();
  var email = document.getElementById("cEmail").value.trim();
  var message = document.getElementById("cMessage").value.trim();

  if (name === "" || email === "" || message === "") {
    show("contactResult", "Please fill in all the fields.");
    return;
  }

  show("contactResult", "Thank you, <b>" + name + "</b>! Your message has been received.");
  document.getElementById("cName").value = "";
  document.getElementById("cEmail").value = "";
  document.getElementById("cMessage").value = "";
}