//Ordering for class extends React.Component:
//
// 1. constructor
// 2. optional static methods
// 3. getChildContext
// 4. componentWillMount
// 5. componentDidMount
// 6. componentWillReceiveProps
// 7. shouldComponentUpdate
// 8. componentWillUpdate
// 9. componentDidUpdate
//10. componentWillUnmount
//11. clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
//12. getter methods for render like getSelectReason() or getFooterContent()
//13. Optional render methods like renderNavigation() or renderProfilePicture()
//14. render

//Libs
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, Redirect } from 'react-router'
import { createHistory, useBasename } from 'history'

//Components
import CommentBox from './components/comments/CommentBox';
import Todo from './components/todo/Todo';


//Constants
const history = useBasename(createHistory)({
  basename: '#/home'
});

//App root elements
class App extends React.Component {
  render() {
    return (
        <div>
          <ul>
            <li><Link to="/comments" activeClassName="active">Comments</Link></li>
            <li><Link to="/todo" activeClassName="active">Todo</Link></li>
          </ul>
          {this.props.children}
        </div>
    )
  }
}

//Render via Router
render((
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="comments" component={CommentBox}>
            </Route>
            <Route path="todo" component={Todo}>
            </Route>
          </Route>
        </Router>
    ),
    document.getElementById('app')
);
