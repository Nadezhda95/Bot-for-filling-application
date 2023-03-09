function botLogic(msgData) {
  let rowObj = new Object();
  
  /*Для обновления старой клавы
  if (msgData.user_name == 'brainwashed_from_rock') {
    edit_msg(msgData.text, msgData.chat_id, msgData.id, getKeyboard());
  } else
  */

  if (msgData.chat_id !== ksChatID && msgData.chat_id !== oldKSChatID) {
    send_action(msgData.chat_id);
    rowObj = getRow(msgData.chat_id);
    breakpoint("msgData.chat_id !== ksChatID", rowObj);

    if ( msgData.is_msg ) {
      const is_command = msgData.text[0] == '/' ? true : false
      if ( is_command ) {
        msgData.command = msgData.text.split(' ')[0];
        switch (msgData.command) {
          case "/start": startHandler(msgData, rowObj); break;
          default      : break;
        }
      } else chat_msg_handler(rowObj, msgData);
    }
    else if ( msgData.is_button ) chat_button_handler(msgData, rowObj);
    //else if ( msgData.is_edited ) 
  
  } else if (msgData.chat_id == ksChatID || msgData.chat_id == oldKSChatID) {
    let userId = new String();
    if (msgData.is_reply) userId = Number(msgData.reply_text.split("\n\n")[0]);
    else userId = Number(msgData.text.split("\n\n")[0]);
    rowObj = getRow(userId);
    breakpoint("msgData.chat_id == ksChatID", rowObj);
    
    ks_chat_handler(msgData, rowObj)
  }
}



