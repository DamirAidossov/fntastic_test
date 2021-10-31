function searchMessages(arr, id){
    let msgs = [];
    for(let i in arr){
      if(arr[i].channel == id){
        msgs.push(arr[i]);
      }
    }
    msgs.sort(function (a, b) {
      if (a.message_id > b.message_id) {
        return 1;
      }
      if (a.message_id < b.message_id) {
        return -1;
      }
      return 0;
    });
    return msgs;
  };

  function createMessageElem(item){
    let li = document.createElement('li');
    let imgDiv = document.createElement('div');
    let txtDiv = document.createElement('div');
    let img = document.createElement('img');
    let nameSpan = document.createElement('span');
    let msgSpan = document.createElement('span');
    li.setAttribute("class","d-flex flex-row p-2");
    imgDiv.setAttribute("class","mx-3 align-self-center");
    img.setAttribute("class","userPic");
    img.setAttribute("src", item.pic);
    img.setAttribute("alt","UserAvatar");
    txtDiv.setAttribute("class","d-flex flex-column");
    nameSpan.innerHTML = item.author;
    msgSpan.setAttribute("class","fs-7");
    msgSpan.innerHTML = item.content;
    imgDiv.appendChild(img);
    txtDiv.appendChild(nameSpan);
    txtDiv.appendChild(msgSpan);
    li.appendChild(imgDiv);
    li.appendChild(txtDiv);
    return li
  }

  module.exports = { searchMessages , createMessageElem}