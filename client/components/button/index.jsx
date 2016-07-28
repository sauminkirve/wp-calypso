/** @ssr-ready **/

/**
 * External dependencies
 */
import { PropTypes, createElement } from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';

export default class Button extends PureComponent {
	static propTypes = {
		compact: PropTypes.bool,
		primary: PropTypes.bool,
		scary: PropTypes.bool,
		type: PropTypes.string,
		href: PropTypes.string,
		borderless: PropTypes.bool
	};

	static defaultProps = {
		type: 'button'
	};

	render() {
		const tag = this.props.href ? 'a' : 'button';
		const className = classNames( 'button', this.props.className, {
			'is-compact': this.props.compact,
			'is-primary': this.props.primary,
			'is-scary': this.props.scary,
			'is-borderless': this.props.borderless
		} );

		const props = { ...this.props, className };
		if ( 'a' === tag ) {
			delete props.type;
		}

		return createElement( tag, props );
	}
}
