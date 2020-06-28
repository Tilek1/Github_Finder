import React from 'react'
import UserItem from './UserItem'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

const Users = ({loading, users}) => {
		if (loading) {
			return <Spinner />
		} else  {

			
			return (<div style={userStyle}>
				{
					users.map(user => {
						return (
							<div key={user.id} >
								<UserItem user={user} />
							</div>
						)
					})
				}
			</div>)
			
		}

	
}


const userStyle = {
	display : 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'

}

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
}


export default Users