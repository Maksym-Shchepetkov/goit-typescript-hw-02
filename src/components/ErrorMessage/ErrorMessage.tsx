import s from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  errorText: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorText }) => {
  return <p className={s.par}>Sorry something went wrong. {errorText}</p>;
};

export default ErrorMessage;
