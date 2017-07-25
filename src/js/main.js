import '../style/main.less'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './appModule.js'

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <App />,
    document.querySelector('.container')
)
