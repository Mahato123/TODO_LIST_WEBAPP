const inputBox=document.querySelector(".inputField input");
const addBtn=document.querySelector(".inputField button");
const todolist=document.querySelector(".todolist");
const deleteAllBtn=document.querySelector(".footer button");


inputBox.onkeyup = ()=>{
    let userData=inputBox.value; 
     //getting user entry value
     if(userData.trim()!=0)
     {                       //if users values arent only spaces
      addBtn.classList.add("active");//active the add button
     }else{
        addBtn.classList.remove("active");//unactive the add button
     }
}

//if user click on the add button
addBtn.onclick = ()=>{


    let userData=inputBox.value;
    let getLocalStorage=localStorage.getItem("New Todo");  //getting localstroge
    if(getLocalStorage==null){      //if localstorage is null
             listArr=[]; //creating blank array                
    }
    else
    {
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
    }
    listArr.push(userData);//pushing  pr adding user data
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming js obj into a json 
    showTasks();    //calling showTasks()
}




//function to add task list inside ul
function showTasks()
{
    let getLocalStorage=localStorage.getItem("New Todo"); //getting local storage

    if(getLocalStorage==null){  //if localstorage is null
        listArr=[];//creating blank array
    }
    else{
        listArr=JSON.parse(getLocalStorage);
    }

   const pendingNumb=document.querySelector(".pendingNumb");
   pendingNumb.textContent=listArr.length;//passing the length value in pendingNumb

   if(listArr.length>0)
   {
    deleteAllBtn.classList.add("active");//

   }
   else{
    deleteAllBtn.classList.remove("active");
   }




   let newLiTag='';
   listArr.forEach((element,index) => {

     newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;


   });

todolist.innerHTML = newLiTag;//adding new li tag inside ul tag

inputBox.value="";  //once task added leave the input field blank


}

//delete task function

function deleteTask(index)
{
    let getLocalStorage=localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);//delete or remove the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming js obj into a json 

    showTasks();
}

// delete all tasks function

deleteAllBtn.onclick = ()=>
{
listArr=[];
localStorage.setItem("New Todo",JSON.stringify(listArr));
showTasks(); //calling showTasks function
}