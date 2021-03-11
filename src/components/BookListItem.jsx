import React from "react"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography";

const StyledCard = withStyles({
  root: {
    height: "100%"
  }
})(Card);

const StyledCardActionArea = withStyles({
  root: {
    height: "100%",
    padding: 16
  }
})(CardActionArea);

const StyledCardMedia = withStyles({
  root: {
    height: 200,
    backgroundSize: "contain"
  }
})(CardMedia);

const BookListItem = ({ title, coverImage, bookId }) => (
  <a href={`/book/${bookId}`}>
    <StyledCard variant="outlined">
      <StyledCardActionArea>
        <StyledCardMedia
          image={coverImage}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {title}
          </Typography>
        </CardContent>
      </StyledCardActionArea>
    </StyledCard>
  </a>
);

BookListItem.propTypes = {
  title: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired
};

export default BookListItem;