import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const goToApp = () => {
        navigate("/login"); // Adjust to your app's route
    };

    return (
        <main className="container d-flex flex-column justify-content-center align-items-center text-center py-5 min-vh-100">
            <h1 className="display-3 fw-bold mb-4">Stay Organized, Stay Productive</h1>
            <p className="lead mb-4 px-2">
                Discover the easiest way to manage your daily tasks. Our to-do list app helps you focus, stay on track, and get things done — all in one place.
            </p>
            <button className="btn btn-primary btn-lg mb-4" onClick={goToApp}>
                Try It Now
            </button>
            <img
                src="https://cdn-icons-png.flaticon.com/512/10333/10333926.png"
                alt="To-Do App"
                className="img-fluid"
                style={{ maxWidth: "350px" }}
            />
        </main>
    );
}

export default HomePage;

