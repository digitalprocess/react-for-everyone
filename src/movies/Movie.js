import React from 'react'
import PropTypes from 'prop-types'

export default function Movie({movie}) {
	return (
		<li>{movie.name}</li>
	)
}

Movie.propTypes = {
	movie: PropTypes.shape({
		name: PropTypes.string
	})
}
