// Import stylesheets
import './style.css';
import assert from 'assert';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');

const STRING_BRAZE =
  '<h>R$ 123</h> <h>R$ 123445</h> ausdhuasdhusd <h>R$ 123445</h>';
const REGEX_TAG_H = new RegExp(/<h>(.|\n)*?<\/h>/gm);
const REGEX_TAG_H_NO_GLOBAL = new RegExp(/<h><\/h>/);
const STRING_BRAZE_MATCH = STRING_BRAZE.match(REGEX_TAG_H);
const STRING_BRAZE_REPLACED = STRING_BRAZE.replace(
  REGEX_TAG_H,
  '<h>HIGHLIGHT_TEXT</h>'
);
console.info({ STRING_BRAZE_MATCH, STRING_BRAZE_REPLACED });

const parseTag = (
  stringBraze: string
): {
  original: string;
  values: string;
  stringWithHighlightText: string;
  final: string;
} => {
  const values = stringBraze.match(REGEX_TAG_H).join(';');
  const stringWithHighlightText = stringBraze.replace(
    REGEX_TAG_H,
    '<h>HIGHLIGHT_TEXT</h>'
  );

  let finalStr = stringWithHighlightText;

  for (let i of values.split(';')) {
    finalStr = finalStr.replace('<h>HIGHLIGHT_TEXT</h>', i);
  }

  return {
    original: stringBraze,
    values,
    stringWithHighlightText,
    final: finalStr,
  };
};

const expectedObj = {
  original: STRING_BRAZE,
  values: '<h>R$ 123</h>;<h>R$ 123445</h>;<h>R$ 123445</h>',
  stringWithHighlightText:
    '<h>HIGHLIGHT_TEXT</h> <h>HIGHLIGHT_TEXT</h> ausdhuasdhusd <h>HIGHLIGHT_TEXT</h>',
  final: STRING_BRAZE,
};

const parsed: any = parseTag(STRING_BRAZE);

appDiv.innerHTML = `<pre>${JSON.stringify(parsed)}</pre>`;
console.table(parsed);
console.log(
  'original',
  expectedObj.original === parsed.original,
  expectedObj.original === parsed.original
    ? expectedObj.original
    : `DIFF ${parsed.original} ${expectedObj.original}`
);
console.log(
  'str',
  expectedObj.values === parsed.values,
  expectedObj.values === parsed.values
    ? expectedObj.values
    : `DIFF ${parsed.values} |\n ${expectedObj.values}`
);

console.log(
  'strHightlight',
  expectedObj.stringWithHighlightText === parsed.stringWithHighlightText,
  expectedObj.stringWithHighlightText === parsed.stringWithHighlightText
    ? expectedObj.stringWithHighlightText
    : `DIFF ${parsed.stringWithHighlightText} |\n ${expectedObj.stringWithHighlightText}`
);

console.log(
  'FINAL',
  expectedObj.final === parsed.final,
  expectedObj.final === parsed.final
    ? expectedObj.final
    : `DIFF ${parsed.final} |\n ${expectedObj.final}`
);
