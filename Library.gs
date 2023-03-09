/**
 * The function sends a message to the chat by bot
 * 
 * @param  {string} msg Text to be sent
 * @param  {number} chat_id
 */
function send(msg, chat_id) {
  var payload = {
  'method': 'sendMessage',
  'chat_id': String(chat_id),
  'text': msg,
  'parse_mode': 'HTML'
  }
  var data = {
    'method': 'post',
    'payload': payload,
    'muteHttpExceptions': true
  }
    UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', data);
}

/**
 * The function edits a message text
 * 
 * @param  {string} msg Text to be sent
 * @param  {number} chat_id
 * @param  {number} msg_id
 * @param  {object} keyboard
 */
function edit_msg(msg, chat_id, msg_id, keyboard) {
  var payload = {
  'method': 'editMessageText',
  'chat_id': String(chat_id),
  'message_id': String(msg_id),
  'text': msg,
  'reply_markup': JSON.stringify(keyboard),
  'parse_mode': 'HTML'
  }
  var data = {
    'method': 'post',
    'payload': payload
  }
    UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', data);
}

/**
 * The function sends a message to the chat by bot with reply
 * 
 * @param  {string} msg Text to be sent
 * @param  {number} chat_id
 */
function send_reply(msg, chat_id, msg_id) {
  var payload = {
  'method': 'sendMessage',
  'chat_id': String(chat_id),
  'text': msg,
  'reply_to_message_id': msg_id,
  'parse_mode': 'HTML'
  }
  var data = {
    'method': 'post',
    'payload': payload
  }
    UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', data);
}

/**
 * The function deletes a message from the chat
 * 
 * @param  {number} chat_id
 * @param  {number} msg_id Message's id to be deleted
 */
function delete_msg(chat_id, msg_id) {
  var payload = {
  'method': 'deleteMessage',
  'chat_id': String(chat_id),
  'message_id': String(msg_id),
  'parse_mode': 'HTML'
  }
  var data = {
    'method': 'post',
    'payload': payload
  }
    UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', data);
}

/**
 * The function sends an inline-keyboard to the chat
 * 
 * @param  {string} msg Text to be sent
 * @param  {number} chat_id
 * @param  {object} keyboard The keyboard to be sent
 * 
 */
function send_key(msg, chat_id, keyboard)
{
  var payload = {
    'method': 'sendMessage',
    'chat_id': String(chat_id),
    'text': msg,
    'parse_mode': 'HTML',
    reply_markup : JSON.stringify(keyboard)
  }
  var data = {
    'method': 'post',
    'payload': payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', data);
}

/**
 * The function removes ReplyKeyboardMarkup
 * 
 * @param  {string} msg Text to be sent
 * @param  {number} chat_id
 * 
 */
function send_removeKeyboard(msg, chat_id) {
   var payload = {
    'method': 'sendMessage',
    'chat_id': String(chat_id),
    'text': msg,
    'parse_mode': 'HTML',
    'reply_markup' : JSON.stringify({'remove_keyboard': true})
  }
  var data = {
    'method': 'post',
    'payload': payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', data); 
}

/**
 * The function sends GIF animation to the chat by bot
 * 
 * @param  {string} file_id GIF's id in telegram
 * @param  {number} chat_id
 * 
 */
function send_animation(file_id, chat_id) {
  var payload = {
  'method': 'sendAnimation',
  'chat_id': String(chat_id),
  'animation': String(file_id)
  }
  var data = {
    'method': 'post',
    'payload': payload
  }
    UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', data);
}

/**
 * The function deletes an inline-keyboard
 * 
 * @param  {number} chat_id
 * @param  {number} msg_id Message's id corresponding to the keyboard
 * 
 */
function delete_inline(chat_id, msg_id) {
  var payload = {
    'method': 'editMessageReplyMarkup',
    'chat_id': String(chat_id),
    'message_id': String(msg_id)
  }
  var Data = {
    'method': 'post',
    'payload': payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', Data); 
}

/**
 * The function deletes an inline-keyboard
 * 
 * @param  {number} chat_id
 * @param  {number} msg_id Message's id corresponding to the keyboard
 * @param  {object} keyboard  The keyboard to be sent instead of current one
 * 
 */
function edit_inline(chat_id, msg_id, keyboard) {
  var payload = {
    'method': 'editMessageReplyMarkup',
    'chat_id': String(chat_id),
    'message_id': String(msg_id),
    'reply_markup': JSON.stringify(keyboard)
  }
  
  var Data = {
    'method': 'post',
    'payload': payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', Data); 
}

/**
 * The function sends the typing action
 * 
 * @param  {number} chat_id
 * 
 */
function send_action(chat_id) {
  var payload = {
    'method': 'sendChatAction',
    'chat_id': String(chat_id),
    'action': 'typing'
  }
  var Data = {
    'method': 'post',
    'payload': payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', Data); 
}


/**
 * The function forwards a message
 * 
 * @param  {number} chat_id
 * @param  {number} from_chat_id
 * @param  {number} msg_id
 * 
 */
function forward_msg(chat_id, from_chat_id, msg_id) {
  var payload = {
    'method': 'forwardMessage',
    'chat_id': String(chat_id),
    'from_chat_id': String(from_chat_id),
    'message_id': String(msg_id)
  }
  var Data = {
    'method': 'post',
    'payload': payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API + '/', Data); 
}

