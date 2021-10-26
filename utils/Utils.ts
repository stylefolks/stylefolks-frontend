import removeMarkdown from 'markdown-to-text';

//https://stackoverflow.com/questions/3790681/regular-expression-to-remove-html-tags

export const makePreContents = (data: string) => {
  const altTextReg = /alt text/g;

  return removeMarkdown(data.replace(altTextReg, ' '));
};

export default {};
