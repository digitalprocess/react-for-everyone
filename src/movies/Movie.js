import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Movie({ movie, config: { images } }) {
	return (
		<li>
			<Link to={`/movie/${movie.id}`}>
				{images &&
					<img
					src={images.base_url + images.poster_sizes[3] + movie.poster_path}
					alt={movie.title + ' Poster'}
					/>
				}
			</Link>
		</li>
	)
}

Movie.propTypes = {
	movie: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		poster_path: PropTypes.string,
	}),
	config: PropTypes.shape({
		images: PropTypes.shape({
			base_url: PropTypes.string,
			poster_sizes: PropTypes.array,
			poster_path: PropTypes.string,
		})
	})
}
