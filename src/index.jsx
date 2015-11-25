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

import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './components/comments/CommentBox';

ReactDOM.render(
    <CommentBox />,
    document.getElementById('app')
);
