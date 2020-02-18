import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={{width: '100%', textAlign: 'center'}}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default LoadingSpinner;