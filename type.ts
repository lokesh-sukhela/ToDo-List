//@ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
    debugger;
    let previousTaskCompleted :Boolean= true;
    const taskList = document.getElementById("taskList") as HTMLElement;
    const addButton = document.getElementById("addButton") as HTMLElement;
    addButton.addEventListener("click", function () {
        const taskInput = (document.getElementById("taskInput") as HTMLInputElement).value;
        if (taskInput !== "" ) {
            const existingTaskNames = Array.from(taskList.querySelectorAll("td:nth-child(2)")).map(td => (td.textContent!.trim()));
            if (!existingTaskNames.includes(taskInput)) {
                const newRow = document.createElement("tr");
                const checkboxCell = document.createElement("td");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkboxCell.appendChild(checkbox);
                newRow.appendChild(checkboxCell);
                checkbox.className = "cb";
                const taskCell = document.createElement("td");
                taskCell.textContent = taskInput;
                newRow.appendChild(taskCell);
                taskCell.className = "tb";
                const statusCell = document.createElement("td");
                const select = document.createElement("select");
                select.className = "selectlist";
                const options = ["To-Do", "In progress", "Completed"];
                for (const optionText of options) {
                    const option = document.createElement("option");
                    option.value = optionText.toLowerCase().replace(" ", "-");
                    option.textContent = optionText;
                    select.appendChild(option);
                }
                select.addEventListener("change", function () {

                    if (select.value === "completed") {

                        checkbox.checked = true;

                        checkbox.disabled = true;

                        select.disabled = true;

                        taskCell.style.textDecoration = "line-through";

                        previousTaskCompleted = true;

                    } else {

                        checkbox.checked = false;

                        taskCell.style.textDecoration = "none";

                        previousTaskCompleted = false;
                    }
                });
                statusCell.appendChild(select);
                newRow.appendChild(statusCell);
                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.style.border = "none";
                deleteButton.setAttribute("class", "fa-solid fa-trash");
                deleteButton.addEventListener("click", function () {

                    newRow.remove();
                });
                deleteCell.appendChild(deleteButton);

                newRow.appendChild(deleteCell);

                taskList.appendChild(newRow);

                (document.getElementById("taskInput") as HTMLInputElement).value = "";
            }
            else if(taskInput == ""){
                window.alert("Empty task can not be inserted");
            }
            else {
                window.alert("task already exists");
            }

        }
        const searchInput = document.getElementById("searchInput") as HTMLInputElement;

        searchInput.addEventListener("input", function () {

            const searchTerm = searchInput.value.toLowerCase();

            const taskRows = document.querySelectorAll("#taskList tr");

            taskRows.forEach(function (row) {

                const taskText = row.querySelector("td:nth-child(2)")!.textContent!.toLowerCase();

                if (taskText.indexOf(searchTerm) !== -1) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }

            });

        });

    });

});