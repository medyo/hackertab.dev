import React, { useContext } from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { APP } from '../Constants';
import PreferencesContext from '../preferences/PreferencesContext';
import { trackOpenLinkFrom } from '../utils/Analytics';

function CardComponent({ icon, title, children, fullBlock, link }) {
	const { openLinksNewTab } = useContext(PreferencesContext);

	const handleHeaderLinkClick = (e) => {
		e.preventDefault();
		let url = `${link}?${APP.ref}`;
		window.open(url, openLinksNewTab ? '_blank' : '_self');
	};

	return (
		<div className={'block' + (fullBlock ? ' fullBlock' : '')}>
			<div className='blockHeader'>
				{icon} {title}{' '}
				{link && (
					<a
						className='blockHeaderLink'
						href={link}
						onClick={
							handleHeaderLinkClick
						}>
						<BsBoxArrowInUpRight />
					</a>
				)}
			</div>
			<div className='blockContent'>{children}</div>
		</div>
	);
}

export default CardComponent;
