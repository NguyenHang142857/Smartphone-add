"use strict";
window.addEventListener("DOMContentLoaded",
    function() {
        if(typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            delLocalStorage();
            allClearLocalStorage();
            selectTable(); //5.テーブルからデータ選択
        }
    }, false
);
//2.LocalStorageへの保存
function saveLocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
        function(e){
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            if (key == "" || value == ""){
                window.alert("Key, Memoはいずれも必須です。");
                return;
            } else {
                let w_confirm = window.confirm("LocalStorageに\n「"+ key +" "+ value + "」\nを保存しますか？");
                //確認ダイアログ「ok」を押されたとき、保存する
                if (w_confirm === true) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value +"を保存しました。"
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        } , false
    );
};
//3.LocalStorageから一件削除
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
        function(e){
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = "0";
            w_cnt = selectCheckBox("del");

            if (w_cnt >= 1) {
                //const key = document.getElementById("textKey").value;
                //const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageから選択されている" + w_cnt + "件を削除しますか？");
                //確認ダイアログ「ok」を押されたとき、保存する
                if (w_confirm === true) {
                    for(let i = 0; i< chkbox1.length; i++){
                        if(chkbox1[i].checked){
                            localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data); 
                        }
                    }
                    viewStorage();
                    let w_msg = "LocalStorageにから" + w_cnt + "件を削除(delete) しました。"
                    window.alert(w_msg);
                    document.getElementById("textKey").value = ""; 
                    document.getElementById("textMemo").value = "";
                }
            }
        } , false
    );
};
//4.LocalStorageから全て削除
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_confirm = window.confirm("LocalStorageのデータをすべて削除(all clear)します。\n よろしですか？");
            if (w_confirm === true) {
                localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageのデータをすべて削除(all clear)しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = ""; 
                document.getElementById("textMemo").value = "";
            }
        } , false
    );
};


//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e) {
            e.preventDefault();
            selectCheckBox("select"); //テーブルからデータ選択
        },false
    );
};


function selectCheckBox(mode) {
    //let w_sel = "0";
    let w_cnt = 0 ;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for(let i = 0; i < chkbox1.length; i++) {
        if(chkbox1[i].checked) {
            if(w_cnt === 0) {
            w_textKey = table1.rows[i+1].cells[1].firstChild.data;
            w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
            //return w_key = "1";
        }
        w_cnt++;
        }
    }
    document.getElementById("textKey").value= w_textKey;
    document.getElementById("textMemo").value= w_textMemo; 
    if(mode === "select"){
        if(w_cnt === 1){
        return w_cnt;
        }else{
        window.alert("一つ選択(select)してください。");
        }
    } 
    if(mode === "del"){
        if(w_cnt >= 1){
        return w_cnt;
        }else{
        window.alert("一つ以上選択(select)してください。");
        }
    } 
};

//localStorage
function viewStorage() {
    const list  = document.getElementById("list");
    while(list.rows[0] ) list.deleteRow(0);

    for (let i=0; i < localStorage.length; i++){
      let w_key = localStorage.key(i);
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      list.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      td1.innerHTML = "<input name = 'chkbox1' type = 'checkbox'>";
      td2.innerHTML = w_key;
      td3.innerHTML = localStorage.getItem(w_key);
    }    
    // jQueryのplugin tablesorterを使ってテーブルのソーﾄ
    // 引数...最初からソートおく例を指定、引数2...0 昇順1降順
    $("#table1").tablesorter({
        sortList: [[1,0]]
    });
    $("#table1").trigger("update");

};