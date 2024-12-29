let button = $("#btn");
button.click(function(e){
    let input = $("input").val();
    button.after(`<h1>Hello there ${input}!</h1>`)
  })