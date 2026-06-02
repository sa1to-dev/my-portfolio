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

   let currentFilter = "all";

   let searchKeyword = "";
   
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
   
   function removeItem(id){
    items = items.filter(function(item, i){
      return item.id !== id;
    })

    localStorage.setItem("todo",JSON.stringify(items));
    renderList();
   }

   function updateTaskCount(){

      const activeItems = items.filter(function(item){
        return item.done === false;
      });

      const doneItems = items.filter(function(item){
        return item.done === true;
      });

    document.getElementById("allCount")
    .textContent = "全件:" +items.length +"件";

    document.getElementById("taskCount")
    .textContent =
      "未完了:" + activeItems.length + "件";

    document.getElementById("doneCount")
    .textContent = "完了済み:" +doneItems.length +"件";
  }

  document.getElementById("searchBtn")
  .addEventListener("click",function(){

    searchKeyword =
     document.getElementById("searchInput").value;
    
    renderList();

  });

  renderList();

  document.getElementById("searchInput")
  .addEventListener("input", function(){

    searchKeyword = this.value;

    renderList();

  });

  function createTodoItem(item){

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = item.text;
  span.style.textDecoration = item.done
    ? "line-through"
    : "none";

  // チェックボックス
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.checked = item.done;

  checkbox.onchange = function(){

    item.done = checkbox.checked;

    localStorage.setItem(
      "todo",
      JSON.stringify(items)
    );

    renderList();
  };

  // 削除ボタン
  const button = document.createElement("button");

  button.textContent = "削除";

  button.onclick = function(){
    removeItem(item.id);
  };

  // 編集ボタン
  const editButton = document.createElement("button");

  editButton.textContent = "編集";

  editButton.onclick = function(){

    const newText = prompt(
      "変更してください",
      item.text
    );

    if(newText !== null && newText.trim() !== ""){

      const targetItem = items.find(function(todo){
        return todo.id === item.id;
      });

      targetItem.text = newText;

      localStorage.setItem(
        "todo",
        JSON.stringify(items)
      );

      renderList();
    }
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);
  li.appendChild(editButton);

  return li;
  }

  function renderList(){

    console.log("renderList実行");

    const list = document.getElementById("list");
    list.innerHTML = "";

     let filteredItems = items;

  if(currentFilter === "active"){
    filteredItems = items.filter(function(item){
      return item.done === false;
    });
  }

  if(currentFilter === "done"){
    filteredItems = items.filter(function(item){
      return item.done === true;
    });
  }

  if(searchKeyword !== ""){
  filteredItems = filteredItems.filter(function(item){
    return item.text.includes(searchKeyword);
  });
  }

   if(filteredItems.length === 0){
    list.innerHTML = "<p>まだ項目がありません</p>";
    return;
    }

    for(let i = 0; i < filteredItems.length; i++){
     
      const li = createTodoItem(filteredItems[i]);

      list.appendChild(li);
     
    }
      updateTaskCount();
   }
   renderList();
   
 document.getElementById("showActive")
  .addEventListener("click", function () {

    currentFilter = "active";

    renderList();
    
    });

 document.getElementById("showDone")
  .addEventListener("click",function(){

     currentFilter = "done";

    renderList();

  });

 document.getElementById("showAll")
 .addEventListener("click",function(){
  currentFilter = "all";
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

    addMemo();

   });

     function addMemo(){

      if(memoInput.value.trim() === "") return;

      memos.push(memoInput.value);

      localStorage.setItem(
       "memos",
      JSON.stringify(memos)
      );

     renderMemo();

     memoInput.value = "";
    }

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

    addMemo();

   }

   });