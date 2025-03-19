function Shop({ score, onPurchase, upgrades }) {
    try {
        return (
            <div className="bg-white rounded-lg p-6 shadow-lg" data-name="shop-container">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <i className="fas fa-store text-blue-600 mr-2"></i>
                    Shop
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-name="shop-items">
                    {upgrades.map((upgrade) => (
                        <div 
                            key={upgrade.id}
                            className={`shop-item p-4 rounded-lg border ${score >= upgrade.cost ? 'hover:shadow-lg' : 'disabled'}`}
                            data-name={`shop-item-${upgrade.id}`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{upgrade.name}</h3>
                                    <p className="text-sm text-gray-600">{upgrade.description}</p>
                                    <p className="text-blue-600 font-medium mt-2">
                                        Cost: {upgrade.cost.toLocaleString()} points
                                    </p>
                                </div>
                                <button
                                    onClick={() => onPurchase(upgrade.id)}
                                    disabled={score < upgrade.cost}
                                    className={`px-4 py-2 rounded-lg ${
                                        score >= upgrade.cost
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Shop component error:', error);
        reportError(error);
        return null;
    }
}
