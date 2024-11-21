import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
};

export default LoadingSpinner;