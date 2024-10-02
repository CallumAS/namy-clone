import { createSignal } from 'solid-js';
import Logo from './components/Logo';
import SearchInput from './components/SearchInput';
import DomainList from './components/DomainList';
import './App.css'; // Optional: For custom styles

const App = () => {
    const [inputValue, setInputValue] = createSignal('');
    const [domains, setDomains] = createSignal([]);
    const [isLoading, setIsLoading] = createSignal(false);

    const sendRequest = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/v1/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: inputValue() }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('API Response:', data);

            if (typeof data === 'object' && data !== null) {
                const entries = Object.entries(data);
                setDomains(entries);
            } else {
                console.error('Unexpected data format:', data);
                setDomains([]);
            }
        } catch (error) {
            console.error('Error fetching domains:', error);
            setDomains([]); // Reset domains on error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div class="min-h-screen bg-cover bg-center text-white p-6" style="background-image: url(&quot;https://i.pinimg.com/originals/1b/83/dc/1b83dce6c2a59c92d2dfdd14df85c377.gif&quot;);">
            <div class="w-full max-w-4xl mx-auto">
                <Logo />
                <SearchInput inputValue={inputValue} setInputValue={setInputValue} sendRequest={sendRequest} isLoading={isLoading} />
                <DomainList domains={domains} />
            </div>
        </div>
    );
};

export default App;
