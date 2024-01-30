const LOCAL_STORAGE_VAR_EXPENSE = "totalExpenseAmount";
const LOCAL_STORAGE_VAR_INCOME = "totalIncomeAmount";

inputValidation();
clearTrackerLocalStorage();
updateBalanceFromHTML();

function inputValidation() {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}

function clearTrackerLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_VAR_EXPENSE);
  localStorage.removeItem(LOCAL_STORAGE_VAR_INCOME);
}

function addTransaction(event) {
  event.preventDefault(); //to prevent the default reset

  const submittedForm = event.target;
  const transDetail = submittedForm.transaction_detail.value;
  const transAmount = submittedForm.transaction_amount.value;

  addToHistory(transDetail, transAmount);
  setAmountDataToLocalStorage(transAmount);
  updateAllValueInTracker();

  submittedForm.reset();
}

function updateBalanceFromHTML() {
  const existingTransItemElement = document.getElementsByClassName(
    "tracker-card__history__item__value"
  );
  // THIS FEATURE IS NOT UPDATED YET
}

function addToHistory(transDetail, transAmount) {
  const newItemNameElement = createNewTransItemElement(transDetail, "name");
  const newItemValueElement = createNewTransItemElement(transAmount, "value");

  const historyDivElement = document.getElementById("tracker-card__history");
  const itemDivElement = document.createElement("div");
  itemDivElement.setAttribute("class", "tracker-card__history__item");

  itemDivElement.appendChild(newItemNameElement);
  itemDivElement.appendChild(newItemValueElement);
  historyDivElement.appendChild(itemDivElement);
}

function createNewTransItemElement(value, classLastName) {
  const newTransactionElement = document.createElement("p");

  let extraFormattingClass = "";
  if (classLastName === "value" && value > 0) {
    extraFormattingClass = " income";
  } else if (classLastName === "value" && value < 0) {
    extraFormattingClass = " expense";
  }

  if (value < 0) {
    value = -value;
  }
  if (classLastName === "value") {
    value = numberInThousandFormat(value);
  }

  newTransactionElement.innerText = value;
  newTransactionElement.setAttribute(
    "class",
    `tracker-card__history__item__${classLastName}${extraFormattingClass} `
  );
  return newTransactionElement;
}

function setAmountDataToLocalStorage(value) {
  let localStorageVar = LOCAL_STORAGE_VAR_EXPENSE;
  if (value > 0) {
    localStorageVar = LOCAL_STORAGE_VAR_INCOME;
  }

  let previousTotalAmount = JSON.parse(localStorage.getItem(localStorageVar));
  if (previousTotalAmount === null) {
    localStorage.setItem(localStorageVar, JSON.stringify(value));
    return;
  }
  let currentTotalAmount = Number(previousTotalAmount) + Number(value);
  localStorage.setItem(localStorageVar, JSON.stringify(currentTotalAmount));
  return;
}

function updateAllValueInTracker() {
  let totalBalance = 0;
  const valueIDs = ["total_income", "total_expense", "total_balance"];
  for (let id of valueIDs) {
    if (id === "total_income") {
      localStorageVar = LOCAL_STORAGE_VAR_INCOME;
    } else if (id === "total_expense") {
      localStorageVar = LOCAL_STORAGE_VAR_EXPENSE;
    } else {
      updateOneValueInTracker(id, totalBalance);

      return;
    }

    let totalValue = Number(JSON.parse(localStorage.getItem(localStorageVar)));
    if (totalValue === null) {
      totalValue = 0;
    }
    totalBalance += totalValue;
    updateOneValueInTracker(id, totalValue);
  }
}

function updateOneValueInTracker(id, value) {
  const targetElement = document.getElementById(id);
  let isNegative = false;
  if (value < 0) {
    isNegative = true;
    value = -value;
  }

  if (id === "total_balance") {
    updateTotalBalanceFormat(isNegative);
  }

  targetElement.innerText = numberInThousandFormat(value);
}

function updateTotalBalanceFormat(isNegative) {
  const totalBalanceElement = document.getElementById("total_balance");
  if (isNegative) {
    totalBalanceElement.classList.add("negative");
    return;
  }
  totalBalanceElement.classList.remove("negative");
}

function numberInThousandFormat(number) {
  let newNumber = new Intl.NumberFormat("id-ID");
  return newNumber.format(number);
}
