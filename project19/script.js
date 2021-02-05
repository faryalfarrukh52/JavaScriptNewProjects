var x = 0;
var array = Array();

function AddElement() {
    array[x] = document.getElementById("input").value;
    alert("Element: " + array[x] + " Added at index " + x);
    x++;
    document.getElementById("input").value = "";
}

function displayElement() {
    var data = "<br/>";

    for (var y = 0; y < array.length; y++) {
        data += "Element " + y + " = " + array[y] + "<br/>";

    }
    document.getElementById("Result").innerHTML = data;
}