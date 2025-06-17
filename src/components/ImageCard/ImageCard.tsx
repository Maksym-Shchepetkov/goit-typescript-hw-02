import s from "./ImageCard.module.css";
import { useRef, useState, useEffect } from "react";

type ImageCardProps = {
  dataImage: string;
  dataAlt: string;
  dataName: string;
  dataLikes: number;
};

interface WidthHeight {
  width: number;
  height: number;
}

const ImageCard: React.FC<ImageCardProps> = ({
  dataImage,
  dataAlt,
  dataName,
  dataLikes,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState<number | undefined>(
    undefined
  );
  const [dimensions, setDimensions] = useState<WidthHeight>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth;
      const height = cardRef.current.offsetHeight;
      setDimensions({ width, height });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      const centerX = left + dimensions.width / 2;
      const centerY = top + dimensions.height / 2;

      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      setMouseX(offsetX);
      setMouseY(offsetY);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelay);
  };

  const handleMouseLeave = () => {
    setMouseLeaveDelay(
      setTimeout(() => {
        setMouseX(0);
        setMouseY(0);
      }, 1000)
    );
  };

  const cardStyles = {
    transform: `rotateY(${mouseX / 20}deg) rotateX(${-mouseY / 20}deg)`, // Регулюємо фактор для обертання
  };

  return (
    <div
      className={s.wrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className={s.card} style={cardStyles}>
        <img className={s.img} src={dataImage} alt={dataAlt} />
        <div className={s.cardInfo}>
          <h2>{dataName}</h2>
          <p>Likes:{dataLikes}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
