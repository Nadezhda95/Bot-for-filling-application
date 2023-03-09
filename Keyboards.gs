let KEYBOARD_Start = 
    {
      "inline_keyboard": [
        [{"text": "СТАРТ", "callback_data": "start"}]
      ],
      "resize_keyboard": true
    }

let KEYBOARD_Approve =
  {
    "inline_keyboard": [
      [{"text": "Знакомство с АА", "callback_data": "meet"}],
      [{"text": "Принять", "callback_data": "yes"}],
      [{"text": "Отклонить", "callback_data": "no"}]
    ],
    "resize_keyboard": true
  }
