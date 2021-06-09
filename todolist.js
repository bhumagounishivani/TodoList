window.onload=()=>{
    const form=document.getElementsByClassName('form');
    let lists=document.getElementById("lists");
    let submit=document.getElementById("submit");
    let editItem=null;
    form[0].addEventListener("submit",addelement);
    lists.addEventListener("click",removeelement);
}
function checksame(data){
    var ul=document.getElementById("lists");
    var li=ul.getElementsByTagName("li");
    for(var i=0;i<li.length;i++){
        var item=li[i].childNodes[0].childNodes[0].childNodes[0].data;//dataor nodeValue works here
        if(item==data){
            return true;
        }
    }
    return false;
}
function addelement(e) {
    e.preventDefault();
    if(submit.value!="Submit"){
        var flag=0;
        if(document.getElementById("item").value.trim()==null||document.getElementById("item").value.trim()==""){
            document.getElementById("label").innerHTML="Task edited is null!!!";
        }
        else if(editItem.target.parentNode.parentNode.childNodes[0].childNodes[0].nodeValue==document.getElementById("item").value){
            document.getElementById("label").innerHTML="Task is not changed...";
            flag=1;
        }
        else if(checksame(document.getElementById("item").value)){
            if(!confirm("Specified task exists.Are you sure you want to edit it!!!")){
                document.getElementById("label").innerHTML="Task already in list";
                flag=1;
            }
        }
        if(flag!=1){
            editItem.target.parentNode.parentNode.childNodes[0].childNodes[0].nodeValue=document.getElementById("item").value;
            document.getElementById("label").innerHTML="Text edited successfully";
        }
        document.getElementById("item").value="";
        document.getElementById("label").style.display="block";
        submit.value="Submit";
        setTimeout(function() {
            document.getElementById("label").style.display="none";
        },3000);
        return false;
    }
    let data=document.getElementById("item").value;
    if(data.trim()==""||data.trim()==null){
        return false;
    }
    else{
        document.getElementById("item").value="";
    }
    if(checksame(data) && !confirm("Are you sure you want to add this task which exists in list")){
        document.getElementById("label").innerHTML="Task already exists";
        document.getElementById("label").style.display="block";
        setTimeout(function() {
            document.getElementById("label").style.display="none";
        },3000);
        return false;
    }
    let list=document.createElement("li");
    let div=document.createElement("div");
    let div1=document.createElement("div");
    let div2=document.createElement("div");
    let edit=document.createElement("button");
    div.classList="listdiv";
    div1.classList="textdiv";
    div2.classList="buttondiv";
    edit.appendChild(document.createTextNode("Edit"));
    edit.className="ulists edit";
    let del=document.createElement("button");
    del.appendChild(document.createTextNode("Delete"));
    del.className="ulists delete";
    div1.appendChild(document.createTextNode(data));
    div2.appendChild(del);
    div2.appendChild(edit);
    div.appendChild(div1);
    div.appendChild(div2);
    list.appendChild(div);
    lists.appendChild(list);
}
function removeelement(e) {
    e.preventDefault();
    if(e.target.classList.contains("edit")){
        document.getElementById("item").value=e.target.parentNode.parentNode.childNodes[0].childNodes[0].nodeValue;
        submit.value="Edit";
        editItem=e;
    }
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure you want to delete this task?")){
            let li=e.target.parentNode.parentNode.parentNode;
            lists.removeChild(li);
            document.getElementById("label").innerHTML="Task deleted successfully";
            document.getElementById("label").style.display="block";
            setTimeout(function() {
                document.getElementById("label").style.display="none";
            },3000);
        }
    }    
}
function search() {
    if(submit.value=="Edit"){
        return false;
    }
    var input=document.getElementById("item").value;
    input=input.toUpperCase();
    var ul=document.getElementById("lists");
    var li=ul.getElementsByTagName("li");
    for(var i=0;i<li.length;i++){
        var item=li[i].childNodes[0].childNodes[0].childNodes[0].data;
        item=item.toUpperCase();
        if(item.indexOf(input)>-1){
            li[i].style.display="";
        }
        else{
            li[i].style.display="none";
        }
    }
}
function displayitems(){
    var ul=document.getElementById("lists");
    var li=ul.getElementsByTagName("li");
    for(var i=0;i<li.length;i++){
        li[i].style.display="block";
    }
}