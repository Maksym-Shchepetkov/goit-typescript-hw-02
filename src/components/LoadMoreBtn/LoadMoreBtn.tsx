import s from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  nextPage: () => void;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ nextPage }) => {
  return (
    <div className={s.wrap}>
      <button type="button" className={s.btn} onClick={nextPage}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
