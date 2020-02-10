import React from 'react';

class LoadingSpinner extends React.Component {
    render(){
        return (
            <div style={{width: '100%', textAlign: 'center'}}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default LoadingSpinner;