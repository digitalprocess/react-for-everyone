import React from 'react'
import PropTypes from 'prop-types'

export default function Movie({ movie, config: { images } }) {
	return (
		<li>
			{images &&
				<img
					src={images.base_url + images.poster_sizes[3]  + movie.poster_path}
					alt={movie.title + ' Poster'}
				/>
			}
			<h3>{movie.title}</h3>
		</li>
	)
}

Movie.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		poster_path: PropTypes.string.isRequired,
	})
}
