import * as React from 'react';
import ArticleList from './ArticleList'
import './App.css'
import { useParams } from 'react-router-dom';
interface RouteParams {
  id: string
}
interface State {
};

interface Props {
  id: string
};


const App = () => {
  let { id } = useParams();

  return (
    < div >
      <ArticleList id={id} />
    </div >
  );
}

export default App