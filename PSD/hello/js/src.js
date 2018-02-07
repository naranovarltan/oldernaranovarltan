$(document).ready(function() {
    $("#addTask").on("click", preAddTask);
    $("#completeTask").on("click", setDoneTask);
    $("#checkedCounter")
        .on("click", ".showCheckedTodos", renderCheckedTodos)
        .on("click", ".showTodos", showTodos);
    $("#uncheckedCounter")
        .on("click", ".showUncheckedTodos", renderUncheckedTodos)
        .on("click", ".showTodos", showTodos);
    $("#taskList")
        .on("click", ".deleteTask", preDeleteTask)
        .on("click", ".doneTask", preSetPDoneTask)
        .on("dblclick", editTask)
        .on("click", ".saveTask", saveTask)
        .on("keypress", ".editTask", function (event) {
            if (event.keyCode === 13) {
                saveKeyTask(event);
                event.preventDefault();
            }
        });
    $("#newTask").on("keypress", function (event) {
        if (event.keyCode === 13) {
            preAddTask();
            event.preventDefault();
        }
    });

    const todos = [];

    function filterTodos() {
        const checkedTodos = [];
        const uncheckedTodos = [];

        todos.forEach(i => {
            if(i.done){
                checkedTodos.push(i);
            } else{
                uncheckedTodos.push(i);
            }
        });

        const checkedCounter = checkedTodos.length;
        const uncheckedCounter = uncheckedTodos.length;

        $("#checkedCounter").find("span").empty();
        $("#checkedCounter").find("span").append(checkedCounter);

        $("#uncheckedCounter").find("span").empty();
        $("#uncheckedCounter").find("span").append(uncheckedCounter);



    }

    function preAddTask(event) {
        const title = $("#newTask").val();
        if (!title) {
            return;
        }
        addTask(title);
        $("#newTask").val("");
        renderTodos();
    }

    function addTask(title) {
        const task = {
            done: false,
            title
        };
        todos.push(task);
    }

    function preDeleteTask(event) {
        const task = $(event.target);
        const index = parseInt(task.parent().attr("data-index"), 10);
        deleteTask(index);
    }

    function deleteTask(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    function preSetPDoneTask(event) {
        const task = $(event.target);
        const index = parseInt(task.parent().attr("data-index"), 10);
        setDoneTask(index);
        renderTodos();
    }

    function setDoneTask(index) {
        const task = todos[index];
        task.done = !task.done;
    }

    function editTask() {
        const eTarget = $(event.target);
        if (eTarget.hasClass("textTask")) {
            const task = $(event.target);
            const index = parseInt(task.parent().attr("data-index"), 10);
            const textTask = task.text();
            task.hide();
            const parent = task.parent();
            const editTask = parent.children(".editTask");
            editTask.val(textTask);
            parent.children(".saveTask").show();
            editTask.show();
        }
    }

    function saveTask(event) {
        const eTarget = $(event.target);
        if (eTarget.hasClass("saveTask")) {
            const parentTask = $(event.target).parent();
            const index = parseInt(parentTask.attr("data-index"), 10);
            const newTextTask = parentTask.find(".editTask").val();
            todos[index].title = newTextTask;
            renderTodos();
        }
    }

    function saveKeyTask(event) {
        const eTarget = $(event.target);
        if (eTarget.hasClass("editTask")) {
            const parentTask = $(event.target).parent();
            const index = parseInt(parentTask.attr("data-index"), 10);
            const newTextTask = parentTask.find(".editTask").val();
            todos[index].title = newTextTask;
            renderTodos();

        }
    }

    function renderTodos() {
        $("#taskList > li").remove();
        todos.forEach((task, index) => {
            const li = $(`
                <li data-index=${index}>
                    <span class="${task.done ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} doneTask"></span>
                    <span class="textTask ${task.done ? 'done' : ''}">${task.title}</span>
                    <input type="text" class="editTask">
                    <button class="btn btn-info saveTask">save</button>
                    <span class="deleteTask glyphicon glyphicon-trash"></span>
                </li>
            `);
            $("#taskList").append(li);
        });
        filterTodos();
        renderPagPage();
        console.log(todos);
    }

    function renderCheckedTodos() {

        const checkedTodos = [];

        todos.forEach(i => {
            if(i.done){
                checkedTodos.push(i);
            } else{
                false;
            }
        });

        $("#taskList > li").remove();
        checkedTodos.forEach((task, index) => {
            const li = $(`
                <li data-index=${index}>
                    <span class="${task.done ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} doneTask"></span>
                    <span class="textTask ${task.done ? 'done' : ''}">${task.title}</span>
                    <input type="text" class="editTask">
                    <button class="btn btn-info saveTask">save</button>
                    <span class="deleteTask glyphicon glyphicon-trash"></span>
                </li>
            `);
            $("#taskList").append(li);
        });
        filterTodos();
    }

    function renderUncheckedTodos() {

        const uncheckedTodos = [];

        todos.forEach(i => {
            if(!i.done){
                uncheckedTodos.push(i);
            } else{
                false;
            }
        });

        $("#taskList > li").remove();
        uncheckedTodos.forEach((task, index) => {
            const li = $(`
                <li data-index=${index}>
                    <span class="${task.done ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} doneTask"></span>
                    <span class="textTask ${task.done ? 'done' : ''}">${task.title}</span>
                    <input type="text" class="editTask">
                    <button class="btn btn-info saveTask">save</button>
                    <span class="deleteTask glyphicon glyphicon-trash"></span>
                </li>
            `);
            $("#taskList").append(li);
        });
        filterTodos();
    }

    function showTodos() {
        renderTodos();
    }

    function renderPagPage() {

    }

});

