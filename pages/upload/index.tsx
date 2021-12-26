import '@toast-ui/editor/dist/toastui-editor.css';
import { writtenPostVar } from 'cache/common/common.cache';
import { Button } from 'components/common/button/Button';
import PageChange from 'components/pageChange/PageChange';
import CategorySelector from 'components/upload/CategorySelector';
import WysiwygEditor from 'components/upload/Editor';
import TempPostBox from 'components/upload/TempPostBox';
import UploadDialog from 'components/upload/UploadDialog';
import useUpload from 'hooks/pages/upload/useUpload';
import React from 'react';

const Upload = () => {
  const { state, actions } = useUpload();
  const {
    router,
    data,
    loading,
    error,
    post,
    pickTempId,
    modifyPostId,
    dialogVar,
    createPostLoading,
    createTempLoading,
    ModifyTempLoading,
    modifyPostLoading,
    modifyPostError,
  } = state;
  const {
    alertOnCancel,
    alertOnConfirm,
    handleTempUpload,
    handleUpload,
    handleTempSave,
    handleTempModify,
    handleModifyDone,
    handleTitleImage,
  } = actions;

  if (error) {
    alert('에러가 발생했습니다 메인화면으로 다시 돌아갑니다.');
    router.push('/');
    return <div>Error!</div>;
  }

  if (loading) {
    return <PageChange />;
  }
  if (createPostLoading || createTempLoading || ModifyTempLoading)
    return <PageChange />;

  return (
    <>
      <div className="wrapper">
        <CategorySelector
          firstCategory={data?.getCategoryByUserRole.firstCategory}
          brands={data?.getCategoryByUserRole.brands}
          crews={data?.getCategoryByUserRole.crews}
        />

        <WysiwygEditor
          autofocus={false}
          initialValue={''}
          height={'90vh'}
          onChange={(contents) => {
            writtenPostVar({ ...post, contents });
            handleTitleImage();
          }}
        />

        <div className="buttonWrapper">
          {modifyPostId ? (
            <Button
              canClick={!modifyPostError && !modifyPostLoading}
              loading={modifyPostLoading}
              actionText="게시글 수정 완료"
              onClick={handleModifyDone}
            />
          ) : (
            <>
              <Button
                canClick={true}
                actionText={
                  pickTempId ? 'Modifications completed' : 'Temporarily Save'
                }
                loading={false}
                onClick={pickTempId ? handleTempModify : handleTempSave}
              />
              <Button
                canClick={true}
                actionText={
                  pickTempId
                    ? 'Upload temp post to new post'
                    : 'Upload new post'
                }
                loading={false}
                onClick={pickTempId ? handleTempUpload : handleUpload}
              />
            </>
          )}
        </div>
        {modifyPostId ? (
          ''
        ) : (
          <TempPostBox tempPosts={data?.getCategoryByUserRole.tempPosts} />
        )}
        <UploadDialog
          visible={dialogVar.visible}
          title={dialogVar.title}
          content={dialogVar.content}
          onCancel={alertOnConfirm}
          onConfirm={alertOnCancel}
        />
      </div>

      <style jsx>{`
        .buttonWrapper {
          display: flex;
          justify-content: space-between;
        }

        .container {
          display: flex;
        }

        .wrapper {
          max-width: 860px;
          width: 95%;
          margin: 2vh 0;
          position: relative;
        }

        @media screen and (max-width: 110px) {
          .toastui-editor-popup {
            position: absolute;
            right: 0px !important;
            top: auto !important;
            left: auto !important;
          }
          .tempBoxWrapper {
            top: 0px;
            left: 0px;
            bottom: -250px;
          }
        }
      `}</style>
    </>
  );
};

export default Upload;
