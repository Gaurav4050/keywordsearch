import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
  Typography,
} from "@material-ui/core";
import "./App.css";

function App() {
  const [values, setValues] = useState("");
  const [data, setData] = useState([]); // eslint-disable-line

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  const API_KEY = "AIzaSyADKByvAyPImzEaw4J1zaSrJo8doIlaoPo";
  const fetchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${values}&key=${API_KEY}`;

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((res) => {
        const result = res.items.map((item) => ({
          videoLink: `https://www.youtube.com/embed/${item.id.videoId}`,
        }));
        setData(result);
      });
  }, [fetchUrl]);

  console.log(data);
  return (
    <div className="App">
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          textDecoration: "underline",
          padding: "10px 0 15px 0",
        }}
      >
        {" "}
        Search Keyword{" "}
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-keyword">Keyword</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={values}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start"></InputAdornment>}
          labelWidth={60}
        />
      </FormControl>

      <Typography
        variant="h5"
        style={{
          textAlign: "center",
          textDecoration: "underline",
          padding: "10px 0 15px 0",
          color: "red",
        }}
      >
        {" "}
        Suggested Videos{" "}
      </Typography>

      <Grid container spacing={3}>
        {data?.map((value) => (
          <Grid key={value} item xs={12} sm={6} md={4}>
            <iframe
              src={value.videoLink}
              title="YouTube video player"
              style={{ width: "100%", height: "100%" }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
