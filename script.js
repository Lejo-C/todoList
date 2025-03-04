var selectedRow = null

function onSubmit(){
    event.preventDefault()
    let formData = readFormData()

    if(selectedRow == null){
    insertRecord(formData)
    }

    else{
    updateRecord(formData)
    }
    
    resetForm()
}

function resetForm() {
    document.getElementById('income').value = '';
    document.getElementById('expense').value = '';
    selectedRow = null;
}

function readFormData(){
    let formData ={};
    formData['income'] = document.getElementById('income').value
    formData['expense'] = document.getElementById('expense').value

    return formData;
}

function insertRecord(data){
    var table = document.getElementById('storeList').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length)
    cell1= newRow.insertCell(0)
    cell1.innerText = data.income

    cell2= newRow.insertCell(1)
    cell2.innerText = data.expense
     
    cell2= newRow.insertCell(2)
    cell2.innerHTML = '<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>'

}


function onEdit(td) {
    selectedRow = td.parentElement.parentElement
    console.log("selectedRow", selectedRow);

    document.getElementById('income').value = selectedRow.cells[0].innerText;
    document.getElementById('expense').value = selectedRow.cells[1].innerText;
}

function updateRecord(formData){
    selectedRow.cells[0].innerText = formData.income
    selectedRow.cells[1].innerText = formData.expense

}

function onDelete(td){
    if(confirm('Delete the selected row?')){
        let row = td.parentElement.parentElement
    console.log("row", row);

    document.getElementById('storeList').deleteRow(row.rowIndex)
    }
    
}

document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll('input[name="dot"]');
    const incomeHeader = document.querySelector("th:nth-child(1)");
    const expenseHeader = document.querySelector("th:nth-child(2)");
    const tableBody = document.querySelector("#storeList tbody");
    function updateTable() {
        const selectedValue = document.querySelector('input[name="dot"]:checked').id;

        if (selectedValue === "rad1") {
            incomeHeader.style.display = "table-cell";
            expenseHeader.style.display = "table-cell";
        } else if (selectedValue === "rad2") {
            incomeHeader.style.display = "table-cell";
            expenseHeader.style.display = "none";
        } else if (selectedValue === "rad3") {
            incomeHeader.style.display = "none";
            expenseHeader.style.display = "table-cell";
        }

        const tableRows = document.querySelectorAll("#storeList tbody tr");

        tableRows.forEach(row => {
            const incomeCell = row.children[0];
            const expenseCell = row.children[1];

            if (selectedValue === "rad1") {
                incomeCell.style.display = "table-cell";
                expenseCell.style.display = "table-cell";
            } else if (selectedValue === "rad2") {
                incomeCell.style.display = "table-cell";
                expenseCell.style.display = "none";
            } else if (selectedValue === "rad3") {
                incomeCell.style.display = "none";
                expenseCell.style.display = "table-cell";
            }
        });
    }

    radioButtons.forEach(radio => {
        radio.addEventListener("change", updateTable);
    });

    updateTable();
});
