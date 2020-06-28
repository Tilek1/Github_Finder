import React from 'react';

const Alert = ({alert}) => {
	return (
		<div>
			{alert !== null && (
				<div className={`alert alert-${alert.type}`}>
					<i className="fas fa-info-circle" ></i> 
					{alert.msg}
				</div>					
			)}
		</div>
	)
}

export default Alert