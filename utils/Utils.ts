import * as removeMarkDown from 'remove-markdown';

//https://stackoverflow.com/questions/3790681/regular-expression-to-remove-html-tags

export const makePreContents = (data: string) => {
  const altTextReg = /alt text/g;
  const blockquotesRegEx = /(^|\n)\s{0,3}>\s?/g;
  const removeNewLineRegEx = /(\S+)\n\s*(\S+)/g;

  return removeMarkDown(
    data
      .replace(altTextReg, ' ')
      .replace(blockquotesRegEx, '\n\n')
      .replace(removeNewLineRegEx, '$1 $2')
  );
};

export default {};
