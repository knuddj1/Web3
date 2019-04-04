function displayData(URL){
    $.get(URL, function(response){
      var responseObj = JSON.parse(response);
      var prepared = prepare_data(responseObj[0]["cell_data"]);
      update(prepared);
      update(prepared);
      // update(prepared);
    }).fail(function(){
        console.log("ERROR");
    }).always(function(){
        console.log("DONE!");
    });
}

function prepare_data(data){
    var out = []
    for(var i = 0; i < data.length; i++){
        out[i] = data[i]["payload"]
    }
    return out
}

function update(data){
    var bBox = d3.select("svg");
    width = +bBox.attr("width");
    height = +bBox.attr("height");
    var c = bBox.selectAll("circle")
    .data(data);
    
    c.exit().remove();

    c.enter().append("circle");

    c.attr("r",10)
    .attr("transform",function(d,i){ return "translate(" +  getRandomInt(1, width) + "," +  getRandomInt(1, height) + ")"})
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}