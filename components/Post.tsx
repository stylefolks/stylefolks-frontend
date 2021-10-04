import '@toast-ui/editor/dist/toastui-editor.css';

interface IPostProps {
  content: string;
}

const Post: React.FC<IPostProps> = ({ content }) => {
  return (
    <>
      <div>Hello Post Sth</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export default Post;
