// This file contains the JavaScript code for the expense tracker application.

let expenses = [];

function addExpense(description, value, category) {
    const expense = {
        id: Date.now(),
        description,
        value: parseFloat(value),
        category
    };
    expenses.push(expense);
    updateExpenseList();
    calculateTotal();
}

function calculateTotal() {
    const total = expenses.reduce((acc, expense) => acc + expense.value, 0);
    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}

function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpenseList();
    calculateTotal();
}

function updateExpenseList() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.innerText = `${expense.description} - $${expense.value.toFixed(2)} (${expense.category})`;
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeExpense(expense.id);
        listItem.appendChild(removeButton);
        expenseList.appendChild(listItem);
    });
}

// Event listener for form submission
document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const value = document.getElementById('value').value;
    const category = document.getElementById('category').value;
    addExpense(description, value, category);
    this.reset();
});