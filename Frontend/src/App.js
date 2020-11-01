import React , { Suspense } from 'react';
import { Link, BrowserRouter, Switch, withRouter } from 'react-router-dom';

import './assets/css/index.css';

import Header    from './assets/modules/Header/Header';
import Footer    from './assets/modules/Footer/Footer';
import Loader    from './assets/modules/Loader/Loader'
import News      from './assets/modules/News/News';
import Afisha    from './assets/modules/Afisha/Afisha';
import Books     from './assets/modules/Books/Books';
import Login     from './assets/modules/Login/Login';
import Services  from './assets/modules/Services/Services';
import Map       from './assets/modules/Map/Map';
import Authority from './assets/modules/Authority/Authority';
import Activity  from './assets/modules/Activity/Activity';
import Mugs      from './assets/modules/Mugs/Mugs';
import Error     from './assets/modules/Error/Error';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <div className='content'>
    <div className='center_content'>
    <Suspense fallback={<Loader />}>
    <Switch>

      <Link path='/news'        component={withRouter(News)}       />
      <Link path='/afisha'      component={withRouter(Afisha)}     />
      <Link path='/services'    component={withRouter(Services)}   />
      <Link path='/map'         component={withRouter(Map)}        />
      <Link path='/authority'   component={withRouter(Authority)}  />
      <Link path='/login'       component={withRouter(Login)}      />
      <Link path='/books'       component={withRouter(Books)}      />
      <Link path='/activity'    component={withRouter(Activity)}   />
      <Link path='/mugs'        component={withRouter(Mugs)}       />

      <Link component={withRouter(Error)} />

    </Switch>
    </Suspense>
    </div>
    </div>
    <Footer />
    </BrowserRouter>
  );
};

export default App;