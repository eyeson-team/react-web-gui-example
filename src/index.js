import ReactDOM from 'react-dom';
import 'rmwc/dist/styles';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// remove discontinued service worker installations
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
    }).catch((error) => {
        console.error(error.message);
    });
}
