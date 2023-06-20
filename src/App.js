import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
import NotFoundPage from "./pages/NotFoundPage";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailPage from "./pages/MovieDetailPage";
// import MovieWatch from "./pages/MovieWatch";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePageLoadMore = lazy(() =>
  import("./pages/MoviePageLoadMore")
);
const MovieDetailPage = lazy(() =>
  import("./pages/MovieDetailPage")
);
const MovieWatch = lazy(() => import("./pages/MovieWatch"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route
              path="/movies"
              // element={<MoviePage></MoviePage>}
              element={
                <MoviePageLoadMore></MoviePageLoadMore>
              }
            ></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route
              path="/movie/:movieId/watch"
              element={<MovieWatch></MovieWatch>}
            ></Route>
            <Route
              path="*"
              element={<NotFoundPage></NotFoundPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
