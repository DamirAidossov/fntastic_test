// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require('fs');
var ipc = require('electron').ipcRenderer;
const { searchMessages , createMessageElem , changeDomData } = require("./src/functions.js")


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
    let msgList = document.getElementById("messagesList")
    msgList.innerHTML = ""
    document.getElementById("channelName").innerHTML = curServ.channels[parseInt(id)-1].name
    let msgs = searchMessages(curServ.messages, parseInt(id))
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
    changeDomData(curServ);
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
  changeDomData(curServ);
  
  
  
  

  
})

                  
