/**
 * External dependencies
 */
import get from 'lodash/get';
import assign from 'lodash/assign';

/**
 * Internal dependencies
 */
import { translate } from 'lib/mixins/i18n';
import SiteTitleControl from 'my-sites/site-title';
import HeaderImageControl from 'components/image-selector';
import DesignToolList from 'my-sites/design-tool-list';
import HomePageSettings from 'my-sites/home-page-settings';

const designToolsById = {

	default: {
		title: translate( 'Customizing' ),
		componentClass: DesignToolList,
	},

	siteTitle: {
		title: translate( 'Site Title, Tagline, and Logo' ),
		componentClass: SiteTitleControl,
		mapStateToProps: state => {
			if ( ! state.preview ) {
				return {};
			}
			const { ui, preview } = state;
			const siteId = ui.selectedSiteId;
			const selectedSite = state.sites.items[ siteId ] || {};
			if ( preview[ siteId ] && preview[ siteId ].customizations.siteTitle ) {
				return preview[ siteId ].customizations.siteTitle;
			}
			return { blogname: selectedSite.name, blogdescription: selectedSite.description };
		},
	},

	headerImage: {
		title: translate( 'Header Image' ),
		componentClass: HeaderImageControl,
		mapStateToProps: state => {
			if ( ! state.preview ) {
				return {};
			}
			const { ui, preview } = state;
			const siteId = ui.selectedSiteId;
			const selectedSite = state.sites.items[ siteId ] || {};
			if ( preview[ siteId ] && preview[ siteId ].customizations.headerImage ) {
				return assign( { site: selectedSite }, preview[ siteId ].customizations.headerImage );
			}
			const headerImagePostId = get( selectedSite, 'options.header_image.attachment_id' );
			const headerImageUrl = get( selectedSite, 'options.header_image.url' );
			const headerImageWidth = get( selectedSite, 'options.header_image.width' );
			const headerImageHeight = get( selectedSite, 'options.header_image.height' );
			return { site: selectedSite, headerImagePostId, headerImageUrl, headerImageWidth, headerImageHeight };
		},
	},

	homePage: {
		title: translate( 'Homepage Settings' ),
		componentClass: HomePageSettings,
		mapStateToProps: state => {
			const siteId = state.ui.selectedSiteId;
			const selectedSite = state.sites.items[ siteId ] || {};
			const isPageOnFront = selectedSite.options.show_on_front === 'page';
			const pageOnFrontId = selectedSite.options.page_on_front;
			const pageForPostsId = selectedSite.options.page_for_posts;
			if ( state.preview && state.preview[ siteId ] && state.preview[ siteId ].customizations.homePage ) {
				return assign( { site: selectedSite, isPageOnFront, pageOnFrontId, pageForPostsId }, state.preview[ siteId ].customizations.homePage );
			}
			return { site: selectedSite, isPageOnFront, pageOnFrontId, pageForPostsId };
		}
	},
};

export default designToolsById;