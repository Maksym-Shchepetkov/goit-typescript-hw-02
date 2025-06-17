import React, { useEffect, type ChangeEvent, type FormEvent } from "react";
import s from "./SearchBar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Photos } from "../App/App";

interface SearchBarProps {
  search: { search: string };
  setSearch: React.Dispatch<React.SetStateAction<{ search: string }>>;
  updatePhotos: (photos: Photos[]) => void;
  updatePage: (page: number) => void;
  total: (pages: number) => void;
  onSubmit: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  updatePhotos,
  updatePage,
  total,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClose, setIsClose] = useState<boolean>(true);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleToggleBoxBtn = () => {
    setIsClose(false);
    setAnimation(true);
  };

  const handleAnimationOff = () => {
    setAnimation(false);
    setIsOpen(true);
  };

  const handleInputOn = () => {
    setIsInput(true);
  };

  const handleResetSerchBox = () => {
    setIsOpen(false);
    setIsClose(true);
    setIsInput(false);
    setAnimation(false);
    updatePhotos([]);
    updatePage(1);
    total(0);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (search.search.trim() === "") {
      setError(
        toast.error(
          "Please fill search field",

          {
            duration: 4000,
            position: "top-right",
          }
        )
      );
      return;
    }
    onSubmit(search.search);

    return setSearch({ search: "" });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <header className={s.header}>
      <Toaster />
      <div
        className={animation ? s.boom : s.isClick}
        onAnimationEnd={handleAnimationOff}
      ></div>
      <button
        onClick={handleToggleBoxBtn}
        className={isClose === true ? s.openBtn : s.isClick}
      >
        Let's Start
      </button>
      <div
        className={isOpen === true ? s.container : s.isClick}
        onAnimationEnd={handleInputOn}
      >
        {isInput === true && (
          <form id="test" onSubmit={handleFormSubmit} className={s.headerForm}>
            <input
              type="text"
              id="testInput"
              name="search"
              value={search.search}
              onChange={handleChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={s.headerInput}
            />

            <button name="button" type="submit" className={s.headerBtn}>
              <FaMagnifyingGlass className={error ? s.red : s.headerIcon} />
            </button>

            <button
              type="button"
              onClick={handleResetSerchBox}
              className={s.back}
            >
              Back to Start
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default SearchBar;
