function LoginForm({ onLogin, onGuestLogin }) {
    try {
        const [formData, setFormData] = React.useState({
            username: '',
            password: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onLogin(formData);
        };

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        return (
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" data-name="login-form">
                <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div data-name="username-input">
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div data-name="password-input">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        data-name="login-button"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button
                        onClick={onGuestLogin}
                        className="text-blue-600 hover:text-blue-800"
                        data-name="guest-login-button"
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginForm component error:', error);
        reportError(error);
        return null;
    }
}
