import React from 'react';

class LoadingSpinner extends React.Component {
    render(){
        return (
            <div className="spinner-border" role="status" style={{textAlign: 'center'}}>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
}

export default LoadingSpinner;