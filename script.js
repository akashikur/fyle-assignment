let grossIncome = document.getElementById("gross-annual-income");
let extraIncome = document.getElementById("extra-income");
let deductions = document.getElementById("deductions");
let ageGroup = document.getElementById("age");
document.getElementById("submit").addEventListener("click", function () {
  let isValidAge = validateAge();
  let grossIncomeValue = parseFloat(grossIncome.value) || 0;
  var extraIncomeValue = parseFloat(extraIncome.value) || 0;
  var deductionsValue = parseFloat(deductions.value) || 0;
  if (isValidAge && grossIncome && extraIncome && deductions) {
    var taxAmount = calculateTax(
      grossIncomeValue,
      extraIncomeValue,
      deductionsValue,
      isValidAge
    );
    showModal(taxAmount);
  } else {
    if (!grossIncomeValue) {
      showErrorIcon(grossIncome);
    }
    if (!extraIncomeValue) {
      showErrorIcon(extraIncome);
    }
    if (!deductionsValue) {
      showErrorIcon(deductions);
    }
    if (!isValidAge) {
      showErrorIcon(ageGroup);
    }
  }
});

var numberFields = document.querySelectorAll(
  '.form-control input[type="text"]'
);
numberFields.forEach(function (input) {
  input.addEventListener("input", function () {
    var inputVal = this.value.trim();
    if (!/^\d*\.?\d*$/.test(inputVal)) {
      // Check for invalid input
      showErrorIcon(this);
    } else {
      hideErrorIcon(this);
    }
  });
});

function showErrorIcon(element) {
  element.nextElementSibling.style.display = "inline-block";
  console.log(element);
}

// Function to hide error icon
function hideErrorIcon(element) {
  element.nextElementSibling.style.display = "none";
}

document.getElementById("age").addEventListener("change", function () {
  validateAge();
});

function validateAge() {
  let ageGroup = document.getElementById("age").value;
  if (!ageGroup) {
    document.getElementById("age").classList.add("has-error");
    return false;
  } else {
    document.getElementById("age").classList.remove("has-error");
    return true;
  }
}

function calculateTax(grossIncomeValue, extraIncomeValue, deductionsValue) {
  let ageGroup = document.getElementById("age").value;
  let totalIncome = grossIncomeValue + extraIncomeValue - deductionsValue;
  let tax = 0;

  if (totalIncome > 800000) {
    if (ageGroup === "34") {
      tax = 0.3 * (totalIncome - 800000);
    } else if (ageGroup === "44") {
      tax = 0.4 * (totalIncome - 800000);
    } else if (ageGroup === "64") {
      tax = 0.1 * (totalIncome - 800000);
    }
  }
  return tax;
}

function showModal(taxAmount) {
  let formattedTaxAmount = taxAmount.toLocaleString();
  const modal = document.getElementById("tax");
  modal.style.display = "flex";
  document.getElementById("taxValue").textContent = formattedTaxAmount;
}
document.getElementById("close").addEventListener("click", () => {
  const modal = document.getElementById("tax");
  modal.style.display = "none";
  grossIncome.value = "";
  extraIncome.value = "";
  deductions.value = "";
  document.getElementById("age").value = "";
});

var tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltips.forEach(function (tooltip) {
  new bootstrap.Tooltip(tooltip);
});
