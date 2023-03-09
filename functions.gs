function setChatsVals(msgData, state, rowObj) {
  breakpoint("setChatsVals", "start")
  if (rowObj && state == 'key_start') {
    Chats.deleteRow(rowObj.ind+1);
    rowObj = null;
  }
  if (!rowObj) Chats.appendRow([msgData.chat_id, new Date(), state, msgData.id, msgData.user_name]);
  else {
    rowObj["ID_msg"] = msgData.id;
    rowObj["User_name"] = msgData.user_name;
    rowObj["ID_chat"] = msgData.chat_id;
    rowObj["State"] = state;
    rowObj["Time"] = new Date();
    const rowArr = Object.values(rowObj)
    rowArr.shift();
    Chats.getRange(rowObj.ind+1,1,1,Chats.getLastColumn()).setValues([rowArr])
  }
}

function getRow(chat_id) {
  const chatsArr = Chats.getRange(1,1,Chats.getLastRow(),Chats.getLastColumn()).getValues();
  const ind = chatsArr.map(e => e[0]).indexOf(chat_id);
  const rowArr = chatsArr[ind];
  
  if (rowArr == null) return null
  else {
    const rowObj = {
      ind: ind
    }
    rowArr.forEach((e,i) => rowObj[chatsArr[0][i]] = e)
    Logger.log(rowObj)

    return rowObj;
  }
}


function setValues() {
  let values_arr = [][19];
  values_arr = Chats.getRange(2,1,Chats.getLastRow(),Chats.getLastColumn()).getValues();
  for (let i=0; i<values_arr.length; i++) {
    if (ts - values_arr[i][1] == "final") {
      values_arr[i] = values_arr.flat()
      Final.getRange(Final.getLastRow()+1,1,i,Final.getLastColumn()).setValues(values_arr);
      //Logger.log(ts - values_arr[i][19]);
    }
  }
  //values_arr = values_arr.flat();
  //Logger.log(values_arr.length);
  //Logger.log(values_arr[0] = values_arr.flat());
  }



function getKeyboard() { //забирает клаву из табл
  let KEYBOARD = new Object();
  let keyboardsArr = Keyboard.getRange(2,1,Keyboard.getLastRow()-1,1).getValues().flat();
  Logger.log(keyboardsArr)

  keyboardsArr.map((e,ind) => keyboardsArr[ind] = [{"text":e, "callback_data":e}])
  KEYBOARD = {
    "inline_keyboard": keyboardsArr,
    "resize_keyboard": true
  }
  
  return KEYBOARD
}

function getMsg(state) {
  //state = "final"
  let allMsgArray = Msg.getRange(1,1,Msg.getLastRow(),3).getValues();
  allMsgArray = allMsgArray.filter(e => e[1] == state);

  const msgArr = new Array();
  allMsgArray.forEach(e => msgArr.push(e[0]))

  return {msg: msgArr, nextState: allMsgArray[0][2]}
}

function setKeyboard(rowObj, vote) { //записывает текст клавы в табл
  let KEYBOARD = getKeyboard(rowObj,type='inline_keyboard'); 
  let key = KEYBOARD.inline_keyboard[vote][0].text; 
  let flag = key.split(' ');
  switch (flag[0])
    {
      case '✅' : flag.splice(0,1,'➖'); break;
      case '➖' : flag.splice(0,1,'✅'); break;
    }
  flag = flag.join(' ');
  KEYBOARD.inline_keyboard[vote][0].text = flag;
  const stagesArr = new Array();
  Logger.log(KEYBOARD.inline_keyboard)
  KEYBOARD.inline_keyboard.forEach(e => stagesArr.push(e[0].text));
  rowObj["Stages"] = stagesArr.join(",\n")
  Logger.log(rowObj)
  
  return rowObj["Stages"]

}



function sendKeyboard(chat_id) { //вернет клаву в виде текста
  let ind_keyboard = getInd(chat_id,Keyboard,1);
  let streams = Keyboard.getRange(ind_keyboard+1,2,1,Keyboard.getLastColumn()).getValues();
  streams = streams.flat();
  streams = streams.join(",\n");

  return streams
}

function saveAnswer(msgData) {
  const allQuestArr = Questions.getRange(2,1,Questions.getLastRow()-1,Questions.getLastColumn()).getValues();

  let i = 0;
  while(i<allQuestArr.length) {
    if (allQuestArr[i][0] == msgData.reply_text.split("\n")[0] && allQuestArr[i][2] == msgData.reply_text.split("\n\n")[1]) {
      allQuestArr[i][allQuestArr[i].length-1] = msgData.text;
      Questions.getRange(2,1,Questions.getLastRow()-1,Questions.getLastColumn()).setValues(allQuestArr);

      return allQuestArr[i]
    } else i++
  }
}

