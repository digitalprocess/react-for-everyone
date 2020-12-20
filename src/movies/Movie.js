import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatDate, isFutureDate } from '../utils'

const locale = 'en-US'
const dateOptions = {
	timeZone: 'UTC',
	year: 'numeric',
	month: 'short',
	day: 'numeric',
}

export default function Movie({ movie, config: { images } }) {
	const releaseDate = new Date(movie.release_date)
	const isNotOutYet = isFutureDate(releaseDate)

	return (
		<MovieStyles>
			<Link to={`/movie/${movie.id}`}>
				{images && movie.poster_path ?
					<img
						src={images.base_url + images.poster_sizes[3] + movie.poster_path}
						alt={movie.title + ' Poster'}
					/>
					:
					<h3>{movie.title}</h3>
				}
				{isNotOutYet &&
					<h5 className="release-status">
						Coming {formatDate(releaseDate, locale, dateOptions)}
					</h5>
				}
			</Link>
		</MovieStyles>
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

const MovieStyles = styled.li`
	position: relative;
	.release-status {
		position: absolute;
		top: 50%;
		left: 0;
		color: #d12028;
		background: rgba(255, 255, 255, 0.8);
		border-color: #d12028;
		transform: rotate(-10deg);
		width: 100%;
		text-align: center;
	}
`
