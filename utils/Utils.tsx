import PageChange from 'components/pageChange/PageChange';
import removeMarkdown from 'markdown-to-text';
import ReactDOM from 'react-dom';

//https://stackoverflow.com/questions/3790681/regular-expression-to-remove-html-tags

export const makePreContents = (data: string) => {
  const altTextReg = /alt text/g;

  return removeMarkdown(data.replace(altTextReg, ' '));
};

export const createSpinner = () => {
  document.body.classList.add('body-page-transition');
  ReactDOM.render(<PageChange />, document.getElementById('page-transition'));
};

export const removeSpinner = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
};

export default {};
