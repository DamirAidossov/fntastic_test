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
    li.setAttribute("class","d-flex flex-row p-2 messageItem");
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

  function changeDomData(curServ){
    document.getElementById("serverName").innerHTML = curServ.name
    document.getElementById("channelName").innerHTML = curServ.channels[0].name
    let chList = document.getElementById("channelsList")
    chList.innerHTML = ""
    for(let i in curServ.channels){
      let span = document.createElement('span')
      let li = document.createElement('li')
      let icon = document.createElement('i')
      if(curServ.channels[i].channel_id == 1){
        span.setAttribute("class","textLight")
        icon.setAttribute('class','fas fa-hashtag textLight mx-3')
        span.setAttribute("channelId",`${curServ.channels[i].channel_id}`)
        icon.setAttribute('channelId',`${curServ.channels[i].channel_id}`)
      } else {
        span.setAttribute("class","textDark")
        icon.setAttribute('class','fas fa-hashtag textDark mx-3')
        span.setAttribute("channelId",`${curServ.channels[i].channel_id}`)
        icon.setAttribute('channelId',`${curServ.channels[i].channel_id}`)
      }
      
      li.setAttribute('channelId', `${curServ.channels[i].channel_id}`)
      li.setAttribute('class',"m-2 channelItem d-flex flex-row align-items-center")
      span.innerHTML = curServ.channels[i].name
      
      li.appendChild(icon)
      li.appendChild(span)
      chList.appendChild(li)
    }

    let uList = document.getElementById("usersList")
    uList.innerHTML = ""
    for(let i in curServ.users){
      let li = document.createElement('li')
      let img = document.createElement('img')
      let span = document.createElement('span')
      img.setAttribute('class',"userListPic mx-2")
      img.setAttribute('src',`${curServ.users[i].pic}`)
      li.setAttribute("class","my-2 w-100")
      span.innerHTML = curServ.users[i].name
      li.appendChild(img)
      li.appendChild(span)
      uList.appendChild(li)
    }

    let mList = document.getElementById("messagesList")
    mList.innerHTML = ""
    let startMessages = searchMessages(curServ.messages, 1)
    for(let i in startMessages){
      let elem = createMessageElem(startMessages[i])
      mList.prepend(elem);
    }
  }

  module.exports = { searchMessages , createMessageElem, changeDomData}