/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import ExternalLink from 'components/external-link';
import { recordPermalinkClick, recordGaEvent } from 'reader/stats';
import PostTime from 'reader/post-time';
import ReaderFullPostHeaderTags from './tags';

const ReaderFullPostHeader = ( { post } ) => {
	const handlePermalinkClick = ( { } ) => {
		recordPermalinkClick( 'full_post_title' );
	};

	const recordDateClick = ( { } ) => {
		recordPermalinkClick( 'timestamp' );
		recordGaEvent( 'Clicked Post Permalink', 'timestamp' );
	};

	return (
		<div className="reader-full-post-header">
			{ post.title
				? <h1 className="reader-full-post-header__title" onClick={ handlePermalinkClick }>
					<ExternalLink className="reader-full-post-header__title-link" href={ post.URL } target="_blank" icon={ false }>
						{ post.title }
					</ExternalLink>
				</h1>
				: null }
			<div className="reader-full-post-header__meta">
				{ post.date && post.URL
					? <span className="reader-full-post-header__date">
						<a className="reader-full-post-header__date-link"
							onClick={ recordDateClick }
							href={ post.URL }
							target="_blank">
							<PostTime date={ post.date } />
						</a>
					</span> : null }

			{ post.tags
				? <ReaderFullPostHeaderTags tags={ post.tags } />
			 	: null }
			</div>
		</div>
	);
};

ReaderFullPostHeader.propTypes = {
	post: React.PropTypes.object.isRequired
};

export default ReaderFullPostHeader;
