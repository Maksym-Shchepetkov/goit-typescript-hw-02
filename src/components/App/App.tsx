import { useEffect, useState } from "react";
import handleGetPhotos from "../../services/api";
import s from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGalery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface SearchValue {
  search: string;
}

export interface Photos {
  id: string;
  alt_description: string;
  likes: number;
  links: {
    download: string;
  };
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
}

interface ResultsData {
  results: Photos[];
  total_pages: number;
}

const App = () => {
  const [searchingValue, setSearchingValue] = useState<SearchValue>({
    search: "",
  });
  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalImg, setModalImg] = useState<Photos | null>(null);
  const [wrong, setWrong] = useState<string | false>(false);

  useEffect(() => {
    const handleFetchPhotos = async () => {
      try {
        if (page === 1) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const data: ResultsData = await handleGetPhotos(query, page);

        setPhotos((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setWrong(error.message);
        } else {
          setWrong("Unknown error");
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    if (query.length) {
      handleFetchPhotos();
    }
  }, [query, page]);

  const handleOnSubmit = (search: string): void => {
    setQuery(search);
    setPhotos([]);
    setPage(1);
  };

  const handleOpenModal = (src: Photos): void => {
    setModalImg(src);
  };

  const handleCloseModal = () => {
    setModalImg(null);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <div className={s.wrapper}>
      <SearchBar
        search={searchingValue}
        setSearch={setSearchingValue}
        onSubmit={handleOnSubmit}
        updatePhotos={setPhotos}
        updatePage={setPage}
        total={setTotalPages}
      />
      {isLoading && <Loader />}
      {photos.length > 0 && (
        <ImageGallery collection={photos} openModal={handleOpenModal} />
      )}
      {isLoadingMore && <Loader />}
      {page < totalPages && !isLoading && (
        <LoadMoreBtn nextPage={handleLoadMoreClick} />
      )}
      {wrong && <ErrorMessage errorText={wrong} />}
      <ImageModal
        isOpen={!!modalImg}
        image={modalImg}
        closeModal={handleCloseModal}
      />
    </div>
  );
};

export default App;
