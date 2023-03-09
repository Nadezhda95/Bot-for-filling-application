function breakpoint(func, text) {
  //сохранение технических данных о ходе выполнения скрипта
  const ts = new Date()
  Debug.appendRow([func, text, ts]);
  if (Debug.getLastRow() > 10000) {
    Debug.deleteRow(2);
  }
}
