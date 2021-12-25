import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getNews: (state) => void (state.loading = true),
    getNewsSuccess: (state, { payload }) =>
      void ((state.news = payload),
      (state.loading = false),
      (state.hasErrors = false)),
    getNewsFailure: (state) =>
      void ((state.loading = false), (state.hasErrors = true)),
  },
});

export const { getNews, getNewsSuccess, getNewsFailure } = newsSlice.actions;

export const newsSelector = (state) => state.news;

export default newsSlice.reducer;

// Asynchronous thunk action
export function fetchNews(params) {
  return async (dispatch) => {
    dispatch(getNews());

    try {
      let { path } = params;
      delete params.path;
      let requiredParams = new URLSearchParams(params);
      requiredParams.append("apiKey", "453771ff99ad4623b355b1854a104ca4");

      const response = await fetch(
        `https://newsapi.org/v2/${path}?` + requiredParams.toString()
      );
      // const response = await fetch('https://newsapi.org/v2/everything?q=apple&from=2021-12-17&to=2021-12-17&sortBy=popularity&apiKey=453771ff99ad4623b355b1854a104ca4')
      const data = await response.json();
      console.log("hello" + JSON.stringify(data));

      dispatch(getNewsSuccess(data.articles));
    } catch (error) {
      dispatch(getNewsFailure());
    }
  };
}
