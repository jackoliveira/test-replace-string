import './style.css';
const appDiv: HTMLElement = document.getElementById('app');

const STRING_BRAZE =
  '<h>R$ 123</h> ausdhuasdhusd <h>R$ 123445</h> ausdhuasdhusd <h>R$ 123445</h>';
const REGEX_TAG_H = new RegExp(/<h>(.|\n)*?<\/h>/gm);
const STRING_BRAZE_MATCH = STRING_BRAZE.match(REGEX_TAG_H);
const REGEX_HIGHLIGHT_TEXT = new RegExp('<h>HIGHLIGHT_TEXT</h>');
const STRING_BRAZE_REPLACED = STRING_BRAZE.replace(
  REGEX_TAG_H,
  '<h>HIGHLIGHT_TEXT</h>'
);
console.info({ STRING_BRAZE_MATCH, STRING_BRAZE_REPLACED });

const EXPECTED_RESULT = {
  original: STRING_BRAZE,
  values: '<h>R$ 123</h>;<h>R$ 123445</h>;<h>R$ 123445</h>',
  stringWithHighlightText:
    '<h>HIGHLIGHT_TEXT</h> ausdhuasdhusd <h>HIGHLIGHT_TEXT</h> ausdhuasdhusd <h>HIGHLIGHT_TEXT</h>',
  final: STRING_BRAZE,
};

const parseTag = (
  stringBraze: string
): {
  original: string;
  values: any;
  stringWithHighlightText: string;
  final: string;
} => {
  const values = stringBraze.match(REGEX_TAG_H);
  const stringWithHighlightText = stringBraze.replace(
    REGEX_TAG_H,
    '<h>HIGHLIGHT_TEXT</h>'
  );

  let finalStr = stringWithHighlightText;

  for (let i of values) {
    finalStr = finalStr.replace(REGEX_HIGHLIGHT_TEXT, i);
  }

  return {
    original: stringBraze,
    values,
    stringWithHighlightText,
    final: finalStr,
  };
};

const parsed: any = parseTag(STRING_BRAZE);
appDiv.innerHTML = `<pre>${parsed.final}</pre>`;

console.table(parsed);

console.log(
  'original',
  EXPECTED_RESULT.original === parsed.original,
  EXPECTED_RESULT.original === parsed.original
    ? EXPECTED_RESULT.original
    : `DIFF ${parsed.original} ${EXPECTED_RESULT.original}`
);

console.log(
  'values',
  EXPECTED_RESULT.values === parsed.values,
  EXPECTED_RESULT.values === parsed.values
    ? EXPECTED_RESULT.values
    : `DIFF ${parsed.values} |\n ${EXPECTED_RESULT.values}`
);

console.log(
  'stringWithHighlightText',
  EXPECTED_RESULT.stringWithHighlightText === parsed.stringWithHighlightText,
  EXPECTED_RESULT.stringWithHighlightText === parsed.stringWithHighlightText
    ? EXPECTED_RESULT.stringWithHighlightText
    : `DIFF ${parsed.stringWithHighlightText} | ${EXPECTED_RESULT.stringWithHighlightText}`
);

console.log(
  'FINAL',
  EXPECTED_RESULT.final === parsed.final,
  EXPECTED_RESULT.final === parsed.final
    ? EXPECTED_RESULT.final
    : `DIFF ${parsed.final} |\n ${EXPECTED_RESULT.final}`
);

console.log(
  parsed.stringWithHighlightText.split(' ').map((text) => {
    if (text.includes('HIGHLIGHT_TEXT')) {
      return `<TextHighlight>${text}</TextHighlight>`;
    }

    return `<Text>${text}</Text>`;
  })
);
