const colors = ["black", "white", "red", "green", "blue", "yellow", "orange", "purple", "brown", "pink", "gray", "cyan", "magenta", "lime", "indigo", "violet"];
let button = $("#btn");
button.click(function(e){
    let text = $("#textInput").val();
    let color = $("#colorInput").val();
    if(!colors.includes(color)){
    button.after("<h1>You have picked the wrong color, please enter the correct one.</h1>")
    }
    else{
        button.after(`<h1 style="color:${color};">${text}</h1>`);
    }
})