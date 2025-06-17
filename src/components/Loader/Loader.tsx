import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.wrap}>
      <div className={s.loader}>
        <div className={s.loaderOutter}></div>
        <div className={s.loaderInner}></div>
      </div>
    </div>
  );
};

export default Loader;
