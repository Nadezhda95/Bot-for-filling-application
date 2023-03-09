function startHandler(msgData, rowObj) {
  const currentState = "key_start";
  const msgArr = getMsg(currentState)["msg"];
  msgArr.forEach(e => send_key(e,msgData.chat_id,KEYBOARD_Start));

  setChatsVals(msgData, currentState, rowObj);
}

function chat_msg_handler(rowObj, msgData) {
  breakpoint("chat_msg_handler", "start");
  const currentState = rowObj["State"];
  let nextState = getMsg(currentState)["nextState"];
  breakpoint("chat_msg_handler", `currentState=${currentState}, nextState=${nextState}`);

  if (nextState) {
    let msgArr = getMsg(nextState)["msg"];
    msgArr.forEach(e => send(e,msgData.chat_id));
    rowObj[currentState] = msgData.text;
    setChatsVals(msgData, nextState, rowObj);

    if (nextState == "final") {
      const rowValuesArr = Object.values(rowObj);
      rowValuesArr.shift();
      let rowKeysArr = Object.keys(rowObj);
      rowKeysArr.shift();
      rowKeysArr = rowKeysArr.map((e,ind) => e = e+": "+rowValuesArr[ind]).join("\n");
      msg = rowObj["ID_chat"] + "\n\n" + "Анкета\n"+rowKeysArr;
      const keyboard = getKeyboard();

      send_key(msg,ksChatID,keyboard);
    }

  } else if (!nextState) {
    setChatsVals(msgData, "final", rowObj);
    send(msgData.chat_id+"\n\n"+msgData.text, ksChatID)
    Questions.appendRow([msgData.chat_id, msgData.id, msgData.text, ""]);
  }

}


function chat_button_handler(msgData, rowObj) {
  breakpoint("chat_button_handler", "start")
  const currentState = rowObj["State"];
  breakpoint("chat_button_handler", `msgData.vote = ${msgData.vote}, currentState = ${currentState}`)
  const nextState = getMsg(currentState)["nextState"];
  let key_answer = "Ваш ответ: ";  
  send(key_answer+msgData.vote,msgData.chat_id);

  if (nextState != "") {
    const msgArr = getMsg(nextState)["msg"];
    //if (nextState.match(/keyboard*/)) send_key(msg,msgData.chat_id,getKeyboard(nextState,"inline_keyboard"));
    //else 
    msgArr.forEach(e => send(e,msgData.chat_id));
    //send(msg,msgData.chat_id)
  }
  
  if (currentState != "key_start") rowObj[currentState] = msgData.vote;

  setChatsVals(msgData, nextState, rowObj);
}

function ks_chat_handler(msgData, rowObj) {
  if ( msgData.is_button ) {
    const msgArr = Keyboard.getRange(2,1,Keyboard.getLastRow()-1,4).getValues().filter(e => e[0] == msgData.vote);
    const msg = msgArr[0][1];
    const editMsg = msgData.text+"\n\n"+msgArr[0][2];
    breakpoint("ks_chat_handler", editMsg)

    send(msg, rowObj["ID_chat"]);
    edit_msg(editMsg, msgData.chat_id, msgData.id, getKeyboard());

    if (msgArr[0][3] != "no") forward_msg(rootChatID, msgData.chat_id, msgData.id);

  } else if ( msgData.is_reply ) {
    if (msgData.reply_text.match(/Анкета*/)) send(msgData.text, msgData.reply_text.split("\n")[0]);
    else {
      const questArr = saveAnswer(msgData);
      send_reply(msgData.text, questArr[0], questArr[1]);
    }
    //forward_msg(msgData.reply_text.split("\n")[0],ksChatID,msgData.id)
  }
}



