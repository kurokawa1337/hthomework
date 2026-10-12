class Marker {
  constructor(color, inkPercent) {
    this.color = color;
    this.inkPercent = Math.max(0, Math.min(100, inkPercent));
    this.output = "";
  }

  print(text) {
    let result = "";
    let ink = this.inkPercent;
    for (const char of String(text)) {
      if (char.trim() !== "") {
        if (ink < 0.5) break;
        ink -= 0.5;
      }
      result += char;
    }
    this.inkPercent = Math.max(0, ink);
    this.output = `<span style="color:${this.color}">${escapeHtml(result)}</span>`;
    return result;
  }
}

class RefillableMarker extends Marker {
  refill(percent = 100) {
    this.inkPercent = Math.min(100, this.inkPercent + Math.max(0, percent));
    return this.inkPercent;
  }
}

class ExtendedDate extends Date {
  toText() {
    return this.toLocaleDateString("uk-UA", { day: "numeric", month: "long" });
  }

  isCurrentOrFuture() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    return date >= today;
  }

  isLeapYear() {
    const year = this.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  nextDate() {
    const next = new ExtendedDate(this.getTime());
    next.setDate(next.getDate() + 1);
    return next;
  }
}

class Employee {
  constructor(id, lastName, firstName, position, department) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.position = position;
    this.department = department;
  }
}

class EmpTable {
  constructor(employees) {
    this.employees = employees;
  }

  getHtml() {
    const rows = this.employees.map(employee =>
      `<tr><td>${escapeHtml(employee.id)}</td><td>${escapeHtml(employee.lastName)}</td><td>${escapeHtml(employee.firstName)}</td><td>${escapeHtml(employee.position)}</td><td>${escapeHtml(employee.department)}</td></tr>`
    ).join("");
    return `<table><thead><tr><th>ID</th><th>Прізвище</th><th>Ім’я</th><th>Посада</th><th>Відділення</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
}

class StyledEmpTable extends EmpTable {
  getStyles() {
    return `<style>
      table{border-collapse:collapse;width:100%;font-family:Arial,sans-serif;margin-top:16px}
      th,td{border:1px solid #b8c5d6;padding:10px;text-align:left}
      th{background:#2457a7;color:#fff}
      tbody tr:nth-child(even){background:#eef4fb}
      tbody tr:hover{background:#dceaff}
    </style>`;
  }

  getHtml() {
    return this.getStyles() + super.getHtml();
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
