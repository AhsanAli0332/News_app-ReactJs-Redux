import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews, newsSelector } from "./Redux/slices/news";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Container } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function App() {
  const [expanded, setExpanded] = React.useState(false);
  const [newss, setNews] = React.useState("apple");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log("===", newsSelector);
  const dispatch = useDispatch();
  const { news, loading, hasErrors } = useSelector(newsSelector);

  console.log("News: ", news);
  let paramters = {
    apple: {
      q: "apple",
      from: "2021-12-19",
      to: "2021-12-19",
      sortBy: "popularity",
      path: "everything",
    },
    tesla: {
      q: "tesla",
      from: "2021-12-19",
      to: "2021-12-19",
      sortBy: "popularity",
      path: "everything",
    },
    business: {
      path: "top-headlines",
      country: "us",
      category:"business"
    }
  }

  useEffect(() => {
    let params = paramters[newss];
    dispatch(fetchNews(params));
  }, [dispatch, newss]);

  const handleChange = (event) => {
    //let params = options[event.target.value];
    setNews(event.target.value);
  };

  if (loading) return <p>Loading news...</p>;
  if (hasErrors) return <p>Cannot display news...</p>;

  return (
    <Container maxWidth="sm">
      <div className="App">
        <h1>Daily News</h1>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">News</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={newss}
            onChange={handleChange}
            label="News"
          >

            <MenuItem value={"apple"}>Apple</MenuItem>
            <MenuItem value={"tesla"}>Tesla</MenuItem>
            <MenuItem value={"business"}>Business</MenuItem>
          </Select>
        </FormControl>

        {news.map((n, i) => (
          <Card key={i} style={{ marginTop: "10px" }} sx={{ maxWidth: "100%" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={n.title}
              subheader={n.author}
            />
            <CardMedia
              component="img"
              height="194"
              image={n.urlToImage}
              alt="News image"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {n.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{n.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default App;
