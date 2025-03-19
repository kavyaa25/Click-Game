function ShareButton({ score }) {
    try {
        const shareMessage = `I just scored ${score.toLocaleString()} points in the Awesome Clicker Game! Can you beat my score?`;
        
        const shareOptions = [
            {
                name: 'Twitter',
                icon: 'fa-twitter',
                color: 'bg-[#1DA1F2]',
                url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`
            },
            {
                name: 'Facebook',
                icon: 'fa-facebook-f',
                color: 'bg-[#4267B2]',
                url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
            }
        ];

        const handleShare = (url) => {
            window.open(url, '_blank', 'width=600,height=400');
        };

        return (
            <div className="flex space-x-2" data-name="share-buttons">
                {shareOptions.map(option => (
                    <button
                        key={option.name}
                        onClick={() => handleShare(option.url)}
                        className={`${option.color} text-white p-2 rounded-full hover:opacity-90 transition-opacity`}
                        data-name={`share-${option.name.toLowerCase()}`}
                    >
                        <i className={`fab ${option.icon}`}></i>
                    </button>
                ))}
            </div>
        );
    } catch (error) {
        console.error('ShareButton component error:', error);
        reportError(error);
        return null;
    }
}
