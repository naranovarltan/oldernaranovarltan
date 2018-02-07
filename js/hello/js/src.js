$(document).ready(function(){
    $("#addTask").on ("click", addPreTask);
    $("#taskList")
        .on("click", ".deleteTask", preDeleteTask)
        .on("click", ".doneTask",   preSetPDoneTask);

    $("#taskList").on("dblclick", function () {
        const eTarget = $(event.target);
        if (eTarget.hasClass("textTask")) {
            const task  = $(event.target);
            const index = parseInt(task.attr("data-index"), 10);
            const textTask = task.text();
            task.hide();
            const parent = task.parent()
            const editTask = parent.children(".editTask");
            editTask.val(textTask);
            parent.children(".saveTask").show();
            editTask.show();
        }
        
    })

    $("#completeTask").on ("click", setDoneTask);
    
    $("#newTask").on ("keypress", function (event) {
        if (event.keyCode === 13) {
            addPreTask();
            event.preventDefault();
        }
    });

    const todos = [{title: "123", done: false}];

    renderTodos()

    function addPreTask (event) {
        const title = $("#newTask").val();
        if (!title) {
            return;
        }
        addTask(title);
        $("#newTask").val("");
        renderTodos();
    }

    function addTask(title){
        const task = {
            done: false,
            title
        }
        todos.push(task);
    }

    function preDeleteTask (event) {
        const index = parseInt(event.currentTarget.attributes["data-index"].value, 10)
        deleteTask (index);
    }

    function deleteTask (index) {
        todos.splice(index, 1);
        renderTodos();
    }

    function preSetPDoneTask (event) {
        const index = parseInt(event.currentTarget.attributes["data-index"].value, 10)
        setDoneTask(index);
        renderTodos();
    }

    function setDoneTask (index) {
        const todo = todos[index];
        todo.done = !todo.done;
    }

    function renderTodos () {
        $("#taskList > li").remove()
        todos.forEach((todo, index) => {
            const li = $(`
                <li>
                    <span class="${todo.done ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} doneTask" data-index=${index}></span>
                    <span class="textTask" data-index=${index}> ${todo.title} </span>
                    <input type="text" class="editTask">
                    <button class="btn btn-info saveTask">save</button>
                    <span class="deleteTask glyphicon glyphicon-trash" data-index=${index}></span>
                </li>
            `)
            $("#taskList").append(li);
        })
    }
});