function getKeyTextContent(lang, button, shiftIsPressed, capsIsOn) {
  if (button.hasAddChar) {
    if (lang === 'ru' && shiftIsPressed) {
      return button.shiftValueRu;
    }
    if (lang === 'ru' && !shiftIsPressed) {
      return button.valueRu;
    }
    if (lang === 'en' && shiftIsPressed) {
      return button.shiftValue;
    }
    if (lang === 'en' && !shiftIsPressed) {
      return button.value;
    }
  } else {
    if (lang === 'ru' && !shiftIsPressed && !capsIsOn) {
      return button.valueRu;
    }
    if (lang === 'ru' && shiftIsPressed && !capsIsOn) {
      return button.shiftValueRu;
    }
    if (lang === 'ru' && shiftIsPressed && capsIsOn) {
      return button.valueRu;
    }
    if (lang === 'ru' && !shiftIsPressed && capsIsOn) {
      return button.shiftValueRu;
    }
    if (lang === 'en' && !shiftIsPressed && !capsIsOn) {
      return button.value;
    }
    if (lang === 'en' && shiftIsPressed && !capsIsOn) {
      return button.shiftValue;
    }
    if (lang === 'en' && shiftIsPressed && capsIsOn) {
      return button.value;
    }
    if (lang === 'en' && !shiftIsPressed && capsIsOn) {
      return button.shiftValue;
    }
  }
  return null;
}

export default getKeyTextContent;
