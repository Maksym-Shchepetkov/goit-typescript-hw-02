import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import type { Photos } from "../App/App";

interface ImageModalProps {
  collection: Photos[];
  openModal: (src: Photos) => void;
}

const ImageGallery: React.FC<ImageModalProps> = ({ collection, openModal }) => {
  return (
    <>
      <ul className={s.container}>
        {collection.map((image) => {
          return (
            <li
              key={image.id}
              className={s.wrap}
              onClick={() => openModal(image)}
            >
              <ImageCard
                dataImage={image.urls.small}
                dataAlt={image.alt_description}
                dataName={image.user.name}
                dataLikes={image.likes}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;
