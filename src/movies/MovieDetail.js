import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { device } from '../viewport'

const BASE_URL = `${process.env.REACT_APP_API_URL}/movie/`
const API_KEY = `?api_key=${process.env.REACT_APP_API_KEY}`
const MOVIE_CONFIG_URL = `${process.env.REACT_APP_API_URL}/configuration?api_key=${process.env.REACT_APP_API_KEY}`

function formatRuntime(runtime) {
	const hours = Math.floor(runtime / 60)
	const minutes = runtime % 60
	return `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'm' : ''}`
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

	return (
		<MovieDetailStyles
			backdrop={
				images.base_url +
				images.backdrop_sizes[3] +
				movie.backdrop_path
			}
		>
			<div className="details">
				<div className="">
					<img
						className="poster"
						src={images.base_url + images.poster_sizes[3] + movie.poster_path}
						alt={movie.title + ' Poster'}
					/>
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
								{new Date(movie.release_date)
									.toLocaleDateString('en-US', {
										timeZone: 'UTC',
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
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

					{!!movie.production_companies.length &&
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
						<button onClick={goBack} className="button">Back to movies</button>
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
			max-width: 700px;
		}
	}
	.back-button {
		display: flex;
		justify-content: center;
		align-items: stretch;
		margin: 2rem 0;
		button {
			color: #333;
			cursor: pointer;
			font-size: 16px;
			font-weight: bold;
			padding: 15px 32px;
			border-radius: 3px;
			text-align: center;
			text-decoration: none;
			transition-duration: 0.4s;
			border: 2px solid #333;
			text-transform: uppercase;
			background-color: white;
			&:hover {
				color: white;
				background-color: #333;
				border: 2px solid #333;
			}
		}
	}
`
