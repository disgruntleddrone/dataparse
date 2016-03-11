(function () {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:63342/ca_data/index.html";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

)()

var buttons;

function myFunction(arr) {
    /*
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i].url + '">' + arr[i].display + '</a><br>';
    }
    document.getElementById("id01").innerHTML = out;
    */

    localStorage.setItem("cData",JSON.stringify(arr));
    parseOpts()
}

function toggleBtnSelect(e){

    var caller = document.getElementById(e.srcElement.id), selObjValue;

    //default
    if(caller.style.backgroundColor==="white") {
        caller.style.color = "white";
        caller.style.backgroundColor = "green";
    }

    else if(caller.style.backgroundColor === "green"){
        caller.style.color = "white";
        caller.style.backgroundColor = "red";
    }
    else{
        caller.style.color = "black";
        caller.style.backgroundColor = "white";
    }

    updateGrid(caller);
}

function updateGrid(caller){

    var manifest = document.getElementById("manifest"), process = true;
    manifest.innerHTML = "";

    var propBtns = document.getElementsByClassName("propSelect");

    jData = JSON.parse(localStorage.cData);

    //iterate array
    for(var i=0;i<jData['animals'].length;i++)
    {
        process = true;
        if (jData['animals'].hasOwnProperty(i))
        {
            //iterate objects
            for(var key in jData['animals'][i]) {

                //select the current object
                selObjValue = jData['animals'][i][key];

                for(var btnIdx = 0; btnIdx < propBtns.length; btnIdx++ ) {

                    if (propBtns[btnIdx].innerHTML === key) {
                        if ((/yes|no/i).test(selObjValue)) {
                            if (propBtns[btnIdx].style.backgroundColor === "white") {
                                continue;
                            }
                            if (propBtns[btnIdx].style.backgroundColor === "green") {
                                if (!(/yes/i).test(selObjValue)) {
                                    process = false;
                                    break;
                                }
                            }
                            if (propBtns[btnIdx].style.backgroundColor === "red") {
                                if (!(/no/i).test(selObjValue)) {
                                    process = false;
                                    break;
                                }
                            }
                            /*
                             {"Class":"Mammals","Species":"Elephant","Carnivore":"No","Dangerous":"Yes"}
                             {"Class":"Mammals","Species":"Lion","Carnivore":"Yes","Dangerous":"Yes"}
                             {"Class":"Bird","Species":"Duck","Carnivore":"Yes","Dangerous":"No"}
                             */
                        }
                    }

                }
            }

            if(process){
                var manifest = document.getElementById("manifest");
                var btnText = document.createTextNode(JSON.stringify(jData['animals'][i]));
                var linebreak = document.createElement("br");

                manifest.appendChild(btnText);
                manifest.appendChild(linebreak);
            }
        }
    }
}

function createButton(title){

    var hndButtonHld = document.getElementById("buttonHld");

    var btn = document.createElement("button");
    var btnText = document.createTextNode(title);
    btn.id = title;
    btn.style.color="black";
    btn.style.font="bold";
    btn.style.fontSize="large";
    btn.style.backgroundColor="white";
    btn.classList.add("propSelect");
    btn.appendChild(btnText);

    if(btn.addEventListener)
        btn.addEventListener("click",toggleBtnSelect,false);
    else
        btn.attachEvent("click",toggleBtnSelect);

    hndButtonHld.appendChild(btn);

    buttons += title;
}

function parseOpts(){

    jData = JSON.parse(localStorage.cData);
    var test,  btnText;

    for(var i=0;i<jData['animals'].length;i++)
    {
        if (jData['animals'].hasOwnProperty(i))
        {
            /*
            var id = jData['animals'][i].id;
            var name = jData['animals'][i].name;
            var info = jData['animals'][i].info;
            */

            for(var key in jData['animals'][i]) {
                test = jData['animals'][i][key];
                if((/yes|no/i).test(test)){
                    //alert(key + ":" + test);

                    btnText = new RegExp(key);
                    if(!btnText.test(buttons))
                        createButton(key);
                }
            }
        }

        var manifest = document.getElementById("manifest");
        var btnText = document.createTextNode(JSON.stringify(jData['animals'][i]));
        var linebreak = document.createElement("br");

        manifest.appendChild(btnText);
        manifest.appendChild(linebreak);

        //alert("ID:" + id + "\nName:" + name + "\nInformation:" + info);
    }
}