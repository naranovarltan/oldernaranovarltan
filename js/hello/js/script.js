$(document).ready(function(){
    $("#addItem").on("click", addItem);
    $("#todos").on("change", ".completeItem", completeItem);
    $("#todos").on("click", ".deleteItem", deleteItem);
    $("#newTodo").on("keypress", function (event){
        if (event.keyCode === 13) {
            addItem();
            event.preventDefault();
        }
    });
    $("#todos").on("dblclick", ".todoText", startEdit);
    $("#todos").on("click", ".saveItem", saveEdit);


    function addItem(event){
        let newTodoText = $("#newTodo").val();
        if (!newTodoText){
            return false;
        } else {
            $("#todos").append('<li> <input type="checkbox" class="completeItem"> <span class="todoText">' + newTodoText + '</span><input type="text" class="editText"><button class="btn btn-info saveItem">save</button><span class="glyphicon glyphicon-trash deleteItem"></span></li>');
            $("#newTodo").val("");
        }
    }
    function deleteItem(){
        $(this).parent().remove();
    }
    function completeItem(){
        $(this).parent().toggleClass("done");
    }
    function startEdit () {
        let currenText = $(this).parent().find(".todoText").text();
        $(this).parent().find(".editText").val(currenText);
        $(this).parent().find(".editText").show();
        $(this).parent().find(".saveItem").show();
        $(this).parent().find(".todoText").hide();
    }
    function saveEdit () {
        $(this).hide();
        let newValue = $(this).parent().find(".editText").val();
        $(this).parent().find(".editText").hide();
        $(this).parent().find(".todoText").text(newValue);
        $(this).parent().find(".todoText").show();
    }


});