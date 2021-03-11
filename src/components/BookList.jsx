import React from "react";
import bookData from "../../data/books.json";
import Grid from '@material-ui/core/Grid';
import BookListItem from "./BookListItem";

const BookList = () => (
  <Grid container justify="center" spacing={2}>
    {bookData.books.map(({ id, title, coverImage }) => (
      <Grid item key={id} md={4} sm={6} xs={12}>
        <BookListItem
          title={title}
          coverImage={coverImage}
          bookId={id}
        />
      </Grid>
    ))}
  </Grid>
);

export default BookList;