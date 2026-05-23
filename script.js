console.log("JSスタート!");

    let count = 0;

    function changeMessage(){
      console.log("ボタンが押された");

      count++;

      const title = document.querySelector("h1");

      if(count % 2 == 0){
        title.textContent = "偶数回クリック🔥";
      } else{
        title.textContent = "奇数回クリック✨";
      }

      console.log(count);

      const paragraph = document.querySelector(".intro");
      paragraph.textContent = "JS勉強中に進化しました";
    }

   let items = JSON.parse(localStorage.getItem("todo")) || [];
   
   const input = document.getElementById("newItem");
   
   input.addEventListener("keypress",function(e){
      if(e.key === "Enter"){
        addItem();
      }
    });

    const addButton = document.getElementById("addBtn");

    addButton.addEventListener("click",function(){
      addItem();
    });

   function addItem(){
    console.log("押された!");
    console.log("[" + input.value + "]");

    if(input.value.trim() ==="")return;

    items.push({
      id: Date.now(),
      text: input.value,
      done: false
    });

    localStorage.setItem("todo",JSON.stringify(items));

    renderList();

    input.value = "";
    }
   
   function removeItem(index){
    items = items.filter(function(item, i){
      return i !== index;
    })

    localStorage.setItem("todo",JSON.stringify(items));
    renderList();
   }

   function updateTaskCount(){

      const activeItems = items.filter(function(item){
        return item.done === false;
      });

    document.getElementById("taskCount")
    .textContent =
      "未完了:" + activeItems.length + "件";
  }

  renderList();


  function renderList(){
    const list = document.getElementById("list");
    list.innerHTML = "";

   if(items.length === 0){
    list.innerHTML = "<p>まだ項目がありません</p>";
    return;
    }

    for(let i = 0; i < items.length; i++){
      const li = document.createElement("li");
      
      const span = document.createElement("span");
      span.textContent = items[i].text;
      span.style.textDecoration = items[i].done ? "line-through" : "none";

      //チェックボックス
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      checkbox.checked = items[i].done;

      checkbox.onchange = function(){
         items[i].done = checkbox.checked;
         localStorage.setItem("todo", JSON.stringify(items));
         renderList();
      };

      const button = document.createElement("button");
      button.textContent = "削除";
      button.onclick = function(){
      removeItem(i);
      };

      const editButton = document.createElement("button");
      editButton.textContent = "編集";
      editButton.onclick = function() {
         const newText = prompt("変更してください", items[i].text);
        
          if (newText !== null && newText.trim() !== "") {
        
            items[i].text = newText;
        
            localStorage.setItem("todo", JSON.stringify(items));
        
            renderList();
          }
      };

     li.appendChild(checkbox);
     li.appendChild(span);
     li.appendChild(button);
     li.appendChild(editButton);
     list.appendChild(li);
     
    }
      updateTaskCount();
   }
   renderList();
   
 document.getElementById("showActive")
  .addEventListener("click", function () {

    const activeItems = items.filter(function(item){
      return item.done === false;
    });
    console.log(activeItems);

    const list = document.getElementById("list");
     list.innerHTML = "";

     for(let i = 0; i < activeItems.length; i++){

     const li = document.createElement("li");

     li.textContent = activeItems[i].text;

     list.appendChild(li);
   }

   });
 document.getElementById("showDone")
  .addEventListener("click",function(){

    const doneItems = items.filter(function(item){
      return item.done === true;
   });

   const list = document.getElementById("list");
   list.innerHTML = "";

   for(let i = 0; i < doneItems.length; i++){

    const li = document.createElement("li");

    li.textContent = doneItems[i].text;

    list.appendChild(li);
   }
  });

 document.getElementById("showAll")
 .addEventListener("click",function(){
  console.log("showAll");
    renderList();
  });

    let num = 0;

   function plus(){
    num++;
    document.getElementById("count").textContent = num;
   }
   function minus(){
    num--;
    document.getElementById("count").textContent = num;
   }

   let memos = 
     JSON.parse(localStorage.getItem("memos")) || [];

   const memoInput = document.getElementById("memoInput");
   const memoList = document.getElementById("memoList");

   document.getElementById("memoBtn")
     .addEventListener("click",function(){

      console.log(memoInput.value);

      if(memoInput.value.trim() === "") return;

      memos.push(memoInput.value);

      localStorage.setItem(
      "memos",
      JSON.stringify(memos)
     );

      renderMemo();

      memoInput.value = "";

     });

     function renderMemo(){

      memoList.innerHTML = "";

      for(let i = 0; i < memos.length; i++){

        const li = document.createElement("li");

        li.textContent = memos[i];

        const button = document.createElement("button");

        button.textContent = "削除";

        button.onclick = function(){
          removeMemo(i);
        };

        li.appendChild(button);

        memoList.appendChild(li);
      }

    }

    function removeMemo(index){

      memos = memos.filter(function(memo,i){
        return i !== index;
      });

       localStorage.setItem(
      "memos",
      JSON.stringify(memos)
     );

      renderMemo();
    }
   renderMemo();

   memoInput.addEventListener("keypress",function(e){

    if(e.key === "Enter"){

      if(memoInput.value.trim() === "") return;

      memos.push(memoInput.value);

      localStorage.setItem(
        "memos",
        JSON.stringify(memos)
      );

      renderMemo();

      memoInput.value = "";

    }
   });