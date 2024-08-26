/**
 * Link controller with popover to emulate core
 * functionality as closely as possible.
 *
 * mark@sayhello.ch 19.10.2.21
 *
 * Usage:

<LinkPopover
    attributes={{
        linkTarget,
        url,
        rel,
    }}
    setAttributes={setAttributes}
    isSelected={isSelected}
/>

 *
 */

import { BlockControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Popover, ToolbarButton } from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';
import { __, _x } from '@wordpress/i18n';
import { displayShortcut } from '@wordpress/keycodes';

const NEW_TAB_REL = 'noreferrer noopener';

export const LinkPopover = (props) => {
	const { attributes, setAttributes, isSelected } = props;
	const { url, linkTarget, rel, opensInNewTab } = attributes;

	const [isEditingURL, setIsEditingURL] = useState(false);
	const ref = useRef();
	const richTextRef = useRef();

	useEffect(() => {
		if (!isSelected) {
			setIsEditingURL(false);
		}
	}, [isSelected]);

	const onToggleOpenInNewTab = (value) => {
		const newLinkTarget = value ? '_blank' : undefined;

		let updatedRel = rel;
		if (newLinkTarget && !rel) {
			updatedRel = NEW_TAB_REL;
		} else if (!newLinkTarget && rel === NEW_TAB_REL) {
			updatedRel = undefined;
		}

		setAttributes({
			linkTarget: newLinkTarget,
			rel: updatedRel,
		});
	};

	const startEditing = (event) => {
		event.preventDefault();
		setIsEditingURL(true);
	};

	const unlink = () => {
		setAttributes({
			url: undefined,
			linkTarget: undefined,
		});
		setIsEditingURL(false);
	};

	return (
		<>
			<BlockControls group="block">
				{!url && <ToolbarButton name="link" icon={link} title={__('Link')} shortcut={displayShortcut.primary('k')} onClick={startEditing} />}
				{!!url && (
					<ToolbarButton
						name="link"
						icon={linkOff}
						title={__('Unlink')}
						shortcut={displayShortcut.primaryShift('k')}
						onClick={unlink}
						isActive={true}
					/>
				)}
			</BlockControls>
			{isSelected && isEditingURL && (
				<Popover
					position="top"
					onClose={() => {
						setIsEditingURL(false);
						richTextRef.current?.focus();
					}}
					focusOnMount={isEditingURL ? 'firstElement' : false}
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={{ url, opensInNewTab }}
						onChange={({ url: newURL = '', opensInNewTab: newOpensInNewTab }) => {
							setAttributes({ url: newURL });

							if (opensInNewTab !== newOpensInNewTab) {
								onToggleOpenInNewTab(newOpensInNewTab);
							}
						}}
						onRemove={() => {
							unlink();
							richTextRef.current?.focus();
						}}
						forceIsEditingLink={isEditingURL}
					/>
				</Popover>
			)}
		</>
	);
};
