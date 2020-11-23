import React from 'react'
import PropTypes from 'prop-types'

export default function Filter({ filter, setFilter }) {
	return (
		<input
			type="text"
			value={filter}
			placeholder="Filter Movies"
			onChange={e => setFilter(e.target.value)}
		/>
	)
}

Filter.propTypes = {
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
}
