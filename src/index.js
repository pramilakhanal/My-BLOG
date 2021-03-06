import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';

import Login from './components/Login'
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import SingleArticle from './components/SingleArticle';
import CreateArticle from './components/CreateArticle';

import AuthService from './services/auth';

import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    const user = localStorage.getItem('user')

    if (user) {
      this.setState({
        authUser: JSON.parse(user)
      })
    } 
  }

  setAuthUser = (authUser) => {
    this.setState({
      authUser
    });
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        {
          location.pathname !== '/login' && location.pathname !== '/signup' &&
          <Navbar authUser={this.state.authUser} />
        }
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" render={
            (props) => <Signup {...props}
                registerUser={this.props.authService.registerUser}
                setAuthUser={this.setAuthUser} />
            } />
        <Route path="/article/:slug" component={SingleArticle} />
        <Route path="/articles/create" component={CreateArticle} />
        {
          location.pathname !== '/login' && location.pathname !== '/signup' &&
          <Footer />
        }
      </div>
    );
  }
}


const Main = withRouter((props) => {
  return (
    <App authService={new AuthService()} {...props} />
  );
});

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
