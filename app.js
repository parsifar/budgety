//variables: 1-balance 2-total-income 3-total expenses
let balance = 0
let totalIncome = 0
let totalExpenses = 0
let spentPercent = 0

//I need an event handler for the form submit: when button is clicked I shoud get the velues of all 3 inputs. if its a + then a>I'll add it to total income  b>add a new li to income list c>update balance. if its a - I need to a>add it to total expenses b>add a new li to expenses c>update the balance

function updateBalance() {
    balance = totalIncome - totalExpenses
    document.getElementById("balance").innerText = balance
}

function updatePercent() {
    spentPercent = Math.round((totalExpenses / totalIncome) * 100)
    document.getElementById('total-percent').innerText = spentPercent + '%'
}

function updateItemsPercent() {
    let items = document.querySelectorAll('#expense-list li')
    for (let i = 0; i < items.length; i++) {
        let value = items[i].querySelector(".value").innerText
        let percent = Math.round((parseInt(value) / totalIncome) * 100)
        items[i].querySelector(".percent").innerText = percent + '%';
    }
}

function updateIncome() {
    document.getElementById('total-income').innerText = totalIncome
}

function updateExpenses() {
    document.getElementById('total-expense').innerText = '-' + totalExpenses
}

function clearInputs() {
    document.getElementById("description").value = ""
    document.getElementById("value").value = ""
}
let deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(211, 118, 138)"><path id="del-btn" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z" /></svg>'

document.getElementById('submit-btn').addEventListener('click', function () {
    let incomeOrExpense = document.getElementById('plusminus')
    let description = document.getElementById('description').value
    let value = document.getElementById('value').value
    if (incomeOrExpense.value === 'income') {
        totalIncome += parseInt(value)
        updateIncome()
        document.getElementById('income-list').innerHTML += `
        <li>
        <span class="description">${description}</span>
        <span class="value">${value}</span>
        <button class="income-item" onclick="deleteItem(this)">${deleteIcon}</button>
        </li>`

    } else {
        let percent = Math.round((parseInt(value) / totalIncome) * 100)
        totalExpenses += parseInt(value)
        updateExpenses()
        document.getElementById('expense-list').innerHTML += `
        <li>
        <span class="description">${description}</span>
        <span class="value">${value}</span>
        <span class="percent">${percent}%</span>
        <button class="expense-item" onclick="deleteItem(this)">${deleteIcon}</button>
        </li>`
    }
    updateBalance()
    updatePercent()
    updateItemsPercent()
    clearInputs()
})

//Delete Items Handler
function deleteItem(e) {
    let value = parseInt(e.parentNode.querySelector('.value').innerText)

    if (e.parentNode.parentNode.id === 'income-list') {
        totalIncome -= value
        updateIncome()
    } else if (e.parentNode.parentNode.id === 'expense-list') {
        totalExpenses -= value
        updateExpenses()
    }

    updateBalance()
    updatePercent()
    updateItemsPercent()
    e.parentNode.remove()
}
