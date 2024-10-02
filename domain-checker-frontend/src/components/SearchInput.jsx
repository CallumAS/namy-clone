import { FaSolidArrowRight } from 'solid-icons/fa';

const SearchInput = ({ inputValue, setInputValue, sendRequest, isLoading }) => (
    <div class="mt-8">
        <div class="relative">
            <input
                type="text"
                value={inputValue()}
                onInput={(e) => setInputValue(e.currentTarget.value)}
                placeholder="Discover your perfect domain..."
                class="w-full h-16 px-6 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-lg placeholder-white placeholder-opacity-70 bg-opacity-10 backdrop-filter backdrop-blur-sm"
            />
            <button
                onClick={sendRequest}
                disabled={isLoading()}
                class="absolute right-2 top-2 h-12 w-12 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
                {isLoading() ? (
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                    <FaSolidArrowRight size={24} />
                )}
            </button>
        </div>
    </div>
);

export default SearchInput;
