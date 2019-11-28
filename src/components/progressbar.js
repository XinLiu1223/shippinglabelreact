import React from 'react';

const getStyle = (num, length) => {
    return {
        width: ((num - 1)  / (length - 1) * 100) + '%'
    }

}

const ProgressBar = props => (
    <div className="progress">   
        <div className="progress-bar progress-bar-info progress-bar-striped" style={getStyle(props.step, props.length)}>
            <span className="sr-only" style={getStyle(props.step, props.length)}></span>
        </div>
        
    </div>
);

  export default ProgressBar;