import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { device } from '../viewport'
import CTAButton from '../CTAButton'
import { formatDate, formatRuntime, isFutureDate } from '../utils'

const BASE_URL = `${process.env.REACT_APP_API_URL}/movie/`
const API_KEY = `?api_key=${process.env.REACT_APP_API_KEY}`
const MOVIE_CONFIG_URL = `${process.env.REACT_APP_API_URL}/configuration?api_key=${process.env.REACT_APP_API_KEY}`

const locale = 'en-US'
const dateOptions = {
	timeZone: 'UTC',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}

export default function MovieDetail() {
	const { id } = useParams()
	const { goBack } = useHistory()
	const [movie, setMovie] = useState({})
	const [config, setConfig] = useState({})

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await fetch(BASE_URL + id + API_KEY)
				const newMovie = await res.json()
				setMovie(newMovie)
			} catch (error) {
				console.log(error)
			}
		}
		getMovie()

		const getConfig = async () => {
			try {
				const res = await fetch(MOVIE_CONFIG_URL)
				const config = await res.json()
				setConfig(config)
			} catch (error) {
				console.log(error)
			}
		}
		getConfig()
	}, [id])

	useEffect(() => { document.title = movie.title || '' })
	if (!movie.title) return null

	const images = config.images
	if (!config.images) return null

	const releaseDate = new Date(movie.release_date)
	const isNotOutYet = isFutureDate(releaseDate)

	return (
		<MovieDetailStyles
			backdrop={
				images.base_url +
				images.backdrop_sizes[3] +
				movie.backdrop_path
			}
		>
			<div className="details">
				<div className="poster-wrapper">
					<img
						className="poster"
						src={images.base_url + images.poster_sizes[3] + movie.poster_path}
						alt={movie.title + ' Poster'}
					/>
					{isNotOutYet &&
						<h3 className="release-status">
							Coming {formatDate(releaseDate, locale, dateOptions)}
						</h3>
					}
				</div>

				<div className="description">
					{movie.title &&
						<h1>{movie.title}</h1>
					}
					{movie.tagline &&
						<h2><em>"{movie.tagline}"</em></h2>
					}
					<small>
						{!!movie.runtime &&
							<span>{formatRuntime(movie.runtime)}</span>
						}

						{!!movie.genres.length &&
							<span>{movie.genres[0].name}</span>
						}

						{movie.release_date &&
							<span>
							{formatDate(movie.release_date, locale, dateOptions)}
							</span>
						}

						{movie.original_language &&
							<span>{movie.original_language.toUpperCase()}</span>
						}

						{!!movie.vote_average &&
							<span>{movie.vote_average}/10</span>
						}
					</small>

					{movie.overview &&
						<p className="overview">{movie.overview}</p>
					}

					{!!movie.production_countries && !!movie.production_countries.length &&
						<ul className="production-countries">
							{movie.production_countries.map((country, i) => (
								<li key={i}>
									{country.name.replace(/(.{14})..+/, '$1')}
								</li>
							))}
						</ul>
					}

					{!!movie.production_companies && !!movie.production_companies.length &&
						<div className="production-companies">
							{movie.production_companies.map(company => (
								company.logo_path &&
								<span key={company.id}>
									<img
										alt={company.name}
										title={company.name}
										src={images.base_url + images.logo_sizes[1] + company.logo_path}
									/>
								</span>
							))}
						</div>
					}

					<div className="back-button">
						<CTAButton onClick={goBack} text="Back to movies" />
					</div>
				</div>
			</div>
		</MovieDetailStyles>
	)
}

const MovieDetailStyles = styled.div`
	position: relative;
	@media ${device.tablet} {
		background: url(${props => props.backdrop}) center/cover no-repeat;
		padding-top: 50vh;
	}
	.details {
		position: relative;
		background: white;
		color: #333;
		padding: 1rem;
		@media ${device.tablet} {
			display: flex;
			justify-content: center;
		}
		h1, h2 {
			text-align: center;
		}
		small {
			display: flex;
			justify-content: space-evenly;
			flex-wrap: wrap;
			span {
				margin: 0.5rem;
			}
		}
	}
	.poster {
		max-width: 50%;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
		display: block;
		margin: auto;
		@media ${device.tablet} {
			max-width: 100%;
			margin-top: -160px;
		}
		@media ${device.laptopL} {
			margin: -160px 2rem auto 160px;
		}
	}
	.description {
		@media ${device.tablet} {
			padding: 1rem;
		}
	}
	.production-countries {
		list-style: none;
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;
		padding: 0;
		font-size: smaller;
		li {
			margin-left: 1rem;
		}
	}
	.production-companies {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
		@media ${device.mobileL} {
			flex-direction: row;
		}
		img {
			padding: 1rem;
			max-width: 100%;
		}
	}
	.overview {
		@media ${device.tablet} {
			max-width: 800px;
		}
	}
	.back-button {
		display: flex;
		justify-content: center;
		align-items: stretch;
		margin: 2rem 0;
	}
	.poster-wrapper {
		position: relative;
		.release-status {
			position: absolute;
			top: 0;
			left: 0;
			color: #d12028;
			background: rgba(255, 255, 255, 0.8);
			border-color: #d12028;
			transform: rotate(-10deg);
			width: 100%;
			text-align: center;
			padding: 0.5rem 0;
			text-transform: uppercase;
		}
	}
`
