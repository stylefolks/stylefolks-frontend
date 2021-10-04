import '@toast-ui/editor/dist/toastui-editor.css';

interface IPostProps {
  content: string;
}

const Post: React.FC<IPostProps> = ({ content }) => {
  // const viewer = new Editor({
  //   el: document.querySelector('#viewer'),
  //   initialValue: content,
  // });
  return (
    <>
      <div>Hello Post Sth</div>
      <div id="viewer"></div>
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
    </>
  );
};

export default Post;
