function doPost(e) {
  const update = JSON.parse(e.postData.contents);
  let msgData = {}
  if (update.hasOwnProperty('message')) {
    msgData = {
      id         : update.message.message_id,
      chat_id    : update.message.chat.id,
      user_name  : update.message.from.username,
      first_name : update.message.from.first_name,
      text       : update.message.text,
      date       : update.message.date/86400+25569.125,
      is_msg     : true
    };

    if (update.message.hasOwnProperty('reply_to_message')) {
      msgData.reply_id          = update.message.reply_to_message.message_id;
      msgData.reply_text        = update.message.reply_to_message.text;
      msgData.reply_date        = update.message.reply_to_message.date;
      msgData.reply_user_name   = update.message.reply_to_message.from.username;
      msgData.reply_first_name  = update.message.reply_to_message.from.first_name;
      msgData.is_reply          =  true
    }
  }

  if (update.hasOwnProperty('edited_message')) {
    msg_data = {
      id         : update.edited_message.message_id,
      chat_id    : update.edited_message.chat.id,
      user_name  : update.edited_message.from.username,
      first_name : update.edited_message.from.first_name,
      text       : update.edited_message.text,
      date       : update.edited_message.date/86400+25569.125,
      is_edited  : true
    } 
  }

  if (update.hasOwnProperty('callback_query')) {
    msgData = {
      id        : update.callback_query.message.message_id,
      chat_id   : update.callback_query.message.chat.id,
      user_name : update.callback_query.from.username,
      firstName : update.callback_query.from.first_name,
      text      : update.callback_query.message.text,
      date      : update.callback_query.message.date/86400+25569.125,
      vote      : update.callback_query.data,
      is_button : true
    }
  }

  if (msgData.chat_id != rootChatID) {
    breakpoint("doPost", msgData)
    botLogic(msgData);
  } 

}
