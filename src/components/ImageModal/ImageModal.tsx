import s from "./ImageModal.module.css";
import download from "../../assets/downoad.jpg";
import Modal from "react-modal";
import type { Photos } from "../App/App";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  image: Photos | null;
  closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  image,
  closeModal,
}) => {
  if (image === null) {
    return;
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={s.modal}
      overlayClassName={s.backdrop}
    >
      <p className={s.par}>{image.alt_description}</p>
      <a href={image.links.download} className={s.link}>
        <img src={download} alt="download" className={s.linkMessage} />
      </a>
      <img src={image.urls.regular} alt="" className={s.reg} />
    </Modal>
  );
};

export default ImageModal;
