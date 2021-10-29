import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import PageDividerStyle from 'styles/common/PageDivider.module.scss';

interface IProps {
  totalPages: number;
  totalResults: number;
  clickPage: number;
  onClick: (_page: number) => void;
}

const PagesDivider: React.FC<IProps> = ({
  totalPages,
  totalResults,
  clickPage,
  onClick,
}) => {
  console.log(totalPages, totalResults);
  const [divide, setDivide] = useState<number>(0);
  const [end, setEnd] = useState<number>(3);

  return (
    <div className={PageDividerStyle.wrapper}>
      {clickPage > 1 && (
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => onClick(clickPage - 1)}
        />
      )}
      <span>
        Page {clickPage} of {totalPages}
      </span>

      {totalPages !== clickPage && (
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => onClick(clickPage + 1)}
        />
      )}
    </div>
  );
};

export default PagesDivider;
