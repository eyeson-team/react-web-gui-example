import { createRoot } from "react-dom/client";
import 'rmwc/dist/styles';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);

// remove discontinued service worker installations
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
    }).catch((error) => {
        console.error(error.message);
    });
}
