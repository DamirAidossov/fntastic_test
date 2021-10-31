// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require('fs');
var ipc = require('electron').ipcRenderer;
const { searchMessages , createMessageElem } = require("./src/functions.js")


window.addEventListener('DOMContentLoaded', () => {
  let rawdata = fs.readFileSync('./src/servers.json');
  let servers = JSON.parse(rawdata);
  let curServ = servers[0];

  document.getElementById("min-btn").addEventListener("click", function (e) {
    ipc.send('minimize');
  });

  document.getElementById("max-btn").addEventListener("click", function (e) {
    ipc.send('maximize');
  });

  document.getElementById("close-btn").addEventListener("click", function (e) {
    ipc.send('close');
  }); 
  document.getElementById("channelsList").addEventListener("click", function (e) {
    if(e.target.tagName == "UL"){
      return;
    }
    let id = e.target.getAttribute('channelId')
    let curSpan = document.querySelector('ul > li > span.textLight')
    let curIcon = document.querySelector('ul > li > i.textLight')
    curSpan.classList.remove('textLight')
    curSpan.classList.add('textDark')
    curIcon.classList.remove('textLight')
    curIcon.classList.add('textDark')
    let span = document.querySelector(`span[channelId="${id}"]`);
    let icon = document.querySelector(`i[channelId="${id}"]`);
    span.classList.remove('textDark')
    span.classList.add('textLight')
    icon.classList.remove('textDark')
    icon.classList.add('textLight')
    console.log("Curr server", curServ)
    let msgList = document.getElementById("messagesList")
    msgList.innerHTML = ""
    document.getElementById("channelName").innerHTML = curServ.channels[parseInt(id)-1].name
    let msgs = searchMessages(curServ.messages, parseInt(id))
    console.log(msgs)
    for(let i in msgs){
      msgList.prepend( createMessageElem(msgs[i]))
    }
  }); 

  document.getElementById("serverList").addEventListener("click", function (e) {
    if(e.target.tagName == "UL"){
      return;
    }
    let id = e.target.getAttribute("servId")
    if(curServ.server_id == parseInt(id)){
      return;
    }
    for(let i in servers){
      if(servers[i].server_id == parseInt(id)){
        curServ = servers[i]
      }
    }
    changeData();
  }); 

  document.getElementById("messageInput").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
      let mList2 = document.getElementById("messagesList")
      let id = document.querySelector('ul > li > span.textLight').getAttribute('channelId')
      let el = {
        messageId: Date.now(),
        channel: parseInt(id),
        content: document.getElementById("messageInput").value,
        author: "Current User",
        pic: "./assets/avatars/1.png",
      }
      for(let i in servers){
        if(servers[i].server_id == curServ.server_id){
          console.log(servers[i])
          servers[i].messages.push(el)
          curServ = servers[i];
        }
      }
      mList2.prepend(createMessageElem(el))
      document.getElementById("messageInput").value = ""

    }
  });
  let servCont = document.getElementById("serverList");
  
  for(let i in servers){
    let li = document.createElement('li')
    li.setAttribute('servId', `${servers[i].server_id}`)
    li.setAttribute('class', "servIconLi")
    let img = document.createElement('img')
    img.setAttribute('servId', `${servers[i].server_id}`)
    img.setAttribute('class',"servIcon")
    img.setAttribute('src',`${servers[i].avatar}`)
    li.appendChild(img)
    servCont.appendChild(li)
  }
  changeData();
  function changeData(){
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
  
  
  

  
})

                  
