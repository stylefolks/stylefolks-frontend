import * as removeMarkDown from 'remove-markdown';

//https://stackoverflow.com/questions/3790681/regular-expression-to-remove-html-tags

export const makePreContents = (data: string) => {
  const regex = /alt text/g;

  return removeMarkDown(data.replace(regex, ' '));
};

export default {};
