/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import classnames from 'classnames';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import Button from 'components/button';
import PopoverMenu from 'components/popover/menu';

class EllipsisMenu extends PureComponent {
	static propTypes = {
		translate: PropTypes.func,
		toggleTitle: PropTypes.string,
		position: PropTypes.string,
		children: PropTypes.oneOfType( [
			PropTypes.node,
			PropTypes.func
		] )
	};

	constructor() {
		super( ...arguments );

		this.state = {
			isMenuVisible: false,
			popoverContext: null
		};

		this.showMenu = this.toggleMenu.bind( this, true );
		this.hideMenu = this.toggleMenu.bind( this, false );

		this.setPopoverContext = this.setPopoverContext.bind( this );
	}

	setPopoverContext( popoverContext ) {
		if ( popoverContext ) {
			this.setState( { popoverContext } );
		}
	}

	toggleMenu( isMenuVisible ) {
		this.setState( { isMenuVisible } );
	}

	getChildren() {
		const { children } = this.props;
		if ( 'function' !== typeof children ) {
			return children;
		}

		if ( ! this.state.isMenuVisible ) {
			return null;
		}

		return children();
	}

	render() {
		const { toggleTitle, translate, position } = this.props;
		const { isMenuVisible, popoverContext } = this.state;
		const classes = classnames( 'ellipsis-menu', {
			'is-menu-visible': isMenuVisible
		} );

		return (
			<span className={ classes }>
				<Button
					ref={ this.setPopoverContext }
					onClick={ isMenuVisible ? this.hideMenu : this.showMenu }
					title={ toggleTitle || translate( 'Toggle menu' ) }
					borderless
					className="ellipsis-menu__toggle">
					<Gridicon
						icon="ellipsis"
						className="ellipsis-menu__toggle-icon" />
				</Button>
				<PopoverMenu
					isVisible={ isMenuVisible }
					onClose={ this.hideMenu }
					position={ position }
					context={ popoverContext }
					className="ellipsis-menu__menu popover">
					{ this.getChildren() }
				</PopoverMenu>
			</span>
		);
	}
}

export default localize( EllipsisMenu );
