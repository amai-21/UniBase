function sortCurrentField(u,v,w) {
    document.location.href = "index.php?mn=" +u + "&cn=" + v + "&dir=" + w;
}

function addNewRowJQ() {
    $("#newdatadiv").hide();
    $("#datainputdiv").show();
}

function editThisRow(x,y,u) {
    const xhttp = new XMLHttpRequest();
    var mn = document.getElementById("mn").value;
    var myurl = "getDataByRow.php?fd1=" + x + "&fd2=" + y + "&mn=" + mn;
    
    xhttp.onload = function () {
        const rowarr = this.responseText.split("@==@");
        
        document.getElementById("numcols").value = rowarr.length;
        
        for (let i = 0; i < rowarr.length; i++) {
            document.getElementById("R" + u + "C" + i).innerHTML = 
                    "<input id='fd" + u + "c" + i + "' type='text' value='" + rowarr[i] + "' size='6' />";
        }
        
        document.getElementById("editbtndiv" + u).style.display = "none";
        document.getElementById("updtbtndiv" + u).style.display = "block";
    };
    
    xhttp.open("GET", myurl, true);
    xhttp.send();
}

function updateThisRow(x,y,u) {
    var mn = document.getElementById("mn").value;
    var numcols = parseInt(document.getElementById("numcols").value);
    var dat = document.getElementById("fd" + u + "c0").value;
    var crtval = "";
    
    var oldfd1 = dat;
    var oldfd2 = document.getElementById("fd" + u + "c1").value;
    
    document.getElementById("R" + u + "C0").innerHTML = dat;
    
    for (let i = 1; i < numcols; i++) {
        crtval = document.getElementById("fd" + u + "c" + i).value;
        dat = dat + "@--@" + crtval;
        document.getElementById("R" + u + "C" + i).innerHTML = crtval;
    }
    
    const xhttp = new XMLHttpRequest();
    var myurl = "setDataByRow.php?fd1=" + x + "&fd2=" + y + "&mn=" + mn + "&dat=" + dat;
    
    xhttp.onload = function () {
        document.getElementById("editbtndiv" + u).style.display = "block";
        document.getElementById("updtbtndiv" + u).style.display = "none";
        
        document.getElementById("editbtndiv" + u).innerHTML = "<input type='button' onclick=\"editThisRow('" + oldfd1 + "','" + oldfd2 + "'," + u + ")\" value='Edit'/>";
        document.getElementById("updtbtndiv" + u).innerHTML = "<input type='button' onclick=\"updateThisRow('" + oldfd1 + "','" + oldfd2 + "'," + u + ")\" value='Update'/>";
        document.getElementById("delbtn" + u).innerHTML = "<input type='button' onclick=\"delThisRow('" + oldfd1 + "','" + oldfd2 + "')\" value='Del'/>";
    };

    xhttp.open("GET", myurl, true);
    xhttp.send();
}

function delThisRow(x,y) {
    var mn = document.getElementById("mn").value;
    var myurl = "delDataByRow.php?fd1=" + x + "&fd2=" + y + "&mn=" + mn;
    
    document.location.href = myurl;
}

function showMaxValJQ(u) {
    var myurl = "getMaxValue.php?mn=" + u;
    
    $.get(myurl, function(data, status){
       $("#mymax").html(data);
  });
}

function showSelectedMax(tableName) {
    var selectedCol = document.getElementById("columnSelect").value;
    $.get("getMaxValue.php", { table: tableName, column: selectedCol }, function(data) {
        $("#mymax").html(data);
    });
}