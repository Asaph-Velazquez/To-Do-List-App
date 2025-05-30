import { CheckCircle, Star, ArrowRight, Calendar, Target } from "lucide-react";
import { useState } from "react";

function HomePage() {
    const [showAlert, setShowAlert] = useState(false);

    const goToApp = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        // navigate("/login"); // Replace with your navigation logic
    };

    const features = [
        {
            icon: <CheckCircle size={32} />,
            title: "Smart Task Management",
            description: "Organize your tasks with intelligent categorization and priority settings"
        },
        {
            icon: <Calendar size={32} />,
            title: "Schedule & Reminders",
            description: "Never miss a deadline with smart notifications and calendar integration"
        },
        {
            icon: <Target size={32} />,
            title: "Goal Tracking",
            description: "Set and achieve your goals with progress tracking and insights"
        }
    ];

    const stats = [
        { number: "50K+", label: "Active Users" },
        { number: "1M+", label: "Tasks Completed" },
        { number: "99.9%", label: "Uptime" },
        { number: "4.8★", label: "User Rating" }
    ];

    return (
        <div className="min-vh-100">
            {/* Alert for demo */}
            {showAlert && (
                <div className="position-fixed top-0 end-0 m-3" style={{zIndex: 1050}}>
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Redirecting to login...</strong>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <main className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="display-1 fw-bold mb-4 lh-1">
                        Stay Organized, Stay Productive
                    </h1>
                    
                    <p className="lead fs-4 mb-5 mx-auto opacity-75" style={{maxWidth: "600px"}}>
                        Transform your daily chaos into organized success. Our intelligent task management system 
                        helps you focus on what matters most and achieve your goals faster than ever.
                    </p>

                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
                        <a href="/login"><button 
                            onClick={goToApp}
                            className="btn btn-primary btn-lg px-4 py-3 fs-5 fw-semibold d-flex align-items-center justify-content-center"
                        >
                            Try It Now - It's Free
                            <ArrowRight size={20} className="ms-2" />
                        </button>
                        </a>
                        <button className="btn btn-outline-secondary btn-lg px-4 py-3 fs-5 fw-semibold">
                            Watch Demo
                        </button>
                    </div>

                    {/* Hero Image */}
                    <div className="mb-5">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/10333/10333926.png"
                            alt="TaskFlow App Interface"
                            className="img-fluid rounded shadow-lg"
                            style={{maxWidth: "350px", transition: "transform 0.3s ease"}}
                            onMouseEnter={(e) => (e.target as HTMLElement).style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => (e.target as HTMLElement).style.transform = "scale(1)"}
                        />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="row text-center mb-5 py-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-6 col-md-3 mb-3">
                            <div className="h2 h1-md fw-bold mb-2">
                                {stat.number}
                            </div>
                            <div className="fw-medium opacity-75">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="mb-5">
                    <div className="text-center mb-5">
                        <h2 className="display-4 fw-bold mb-3">
                            Why Choose TaskFlow?
                        </h2>
                        <p className="fs-4 mx-auto opacity-75" style={{maxWidth: "600px"}}>
                            Discover the features that make us the preferred choice for millions of users worldwide
                        </p>
                    </div>

                    <div className="row g-4">
                        {features.map((feature, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card h-100 shadow-sm border-0 p-4">
                                    <div className="card-body">
                                        <div className="mb-3">{feature.icon}</div>
                                        <h3 className="card-title h5 fw-bold mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="card-text opacity-75">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="card border-0 shadow-lg p-5 text-center">
                    <div className="card-body">
                        <h2 className="display-5 fw-bold mb-3">
                            Ready to Transform Your Productivity?
                        </h2>
                        <p className="fs-4 mb-4 opacity-75">
                            Join thousands of users who have already revolutionized their daily workflow
                        </p>
                        <a href="/rForm">
                        <button 
                            onClick={goToApp}
                            className="btn btn-primary btn-lg px-5 py-3 fs-5 fw-semibold"
                        >
                            Start Your Journey Today
                        </button>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;