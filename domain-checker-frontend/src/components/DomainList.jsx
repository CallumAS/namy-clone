const DomainList = ({ domains }) => (
    <div class="mt-8 min-h-46 overflow-y-auto" style="max-height: calc(100vh - 600px);">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {domains().map(([domain, isActive], index) => (
                <a
                    key={domain}
                    href={isActive ? `https://porkbun.com/checkout/search?q=${domain}` : '#'}
                    class={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-4 transition-all duration-300 transform hover:scale-105 ${isActive ? 'hover:bg-opacity-20 hover:shadow-lg' : 'opacity-50 cursor-not-allowed'}`}
                    style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}
                >
                    <p class={`text-center font-medium ${isActive ? 'text-gray-300' : 'text-gray-400 line-through'}`}>
                        {domain}
                    </p>
                </a>
            ))}
        </div>
    </div>
);

export default DomainList;
