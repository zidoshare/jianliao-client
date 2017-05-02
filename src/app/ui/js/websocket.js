require('./js/stomp.js')
require('./js/sockjs.min.js')

var stompClient = null
  var host = 'http://localhost:8000'
  function connect(){
    var socket = new SockJS(host+'/queue')
    stompClient = Stomp.over(socket) //使用Stomp.over(ws)方法，ws参数可以指定其他类型的WebSocket（如SockJS包装的WebSocket）
    stompClient.connect({},function(frame){
      stompClient.subscribe('/topic/greetings',function(response){
        console.log('-----------------response start--------------------')
        console.log(response)
        console.log('-----------------response end--------------------')
      })
      stompClient.subscribe('/user/2/message',function(response){
        console.log('-----------------推送 start--------------------')
        console.log(response)
        console.log('-----------------推送 end--------------------')
      })
    })
    // stompClient.debug = function(str) {
    //   // append the debug log to a #debug div somewhere in the page using JQuery:
    //   console.warn(str)
    // }
  }

  function disConnect(){
    if(stompClient != null){
      stompClient.disconnect()
    }

    console.log('disconnect')
  }

  function sendMessage(){
      var message = document.getElementById('account').value
      var data = JSON.stringify({
        name: message
      })
      stompClient.send('/user/hello', {}, data)
  }