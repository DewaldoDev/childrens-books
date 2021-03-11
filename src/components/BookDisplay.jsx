import React from "react";
import { useParams } from "react-router-dom";
import bookData from "../../data/books.json";

const BookDisplay = () => {
  const { bookId } = useParams();
  const book = bookData.books.find(({ id }) => id === bookId);

  return(
    <div>
      {book && <div dangerouslySetInnerHTML={{__html: book.pageBody}} />}
    </div>
  );
};

export default BookDisplay;