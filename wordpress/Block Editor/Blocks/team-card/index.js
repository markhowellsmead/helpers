/**
 * Team card with photo, name and role. The image is managed using the
 * MediaPlaceholder and (if there's already an image selected) the
 * MediaReplaceFlow component(s). This allows click-select and drag-drop
 * support.
 *
 * mark@sayhello.ch since January 2023.
 */

import {
	BlockControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { __, _x } from '@wordpress/i18n';
import { commentAuthorAvatar as icon } from '@wordpress/icons';

import MediaUploadLoadingImage from '../_components/MediaUploadLoadingImage';

const blockName = 'sht/team-single';
const classNameBase = getBlockDefaultClassName(blockName);

const FigureHtml = (props) => {
	const { classNameBase, image } = props;

	if (!image.id) {
		return '';
	}

	let srcSet,
		src = image.url;

	if (image.media_details?.sizes) {
		srcSet = Object.entries(image.media_details.sizes)
			.map(([key, entry]) => `${entry.source_url} ${entry.width}w`)
			.join(', ');

		src = image.media_details.sizes.thumbnail.source_url;
	} else if (image.sizes) {
		srcSet = Object.entries(image.sizes)
			.map(([key, entry]) => `${entry.url} ${entry.width}w`)
			.join(', ');

		src = image.sizes.thumbnail.url;
	}

	return (
		<figure class={`${classNameBase}__figure`}>
			<img
				src={src}
				srcset={srcSet}
				alt={image.alt}
				className={`${classNameBase}__image`}
			/>
		</figure>
	);
};

registerBlockType(blockName, {
	apiVersion: 2,
	title: _x('Teammitglied', 'Block title', 'sha'),
	description: _x(
		'Gibt die Angaben als Teammitglied-Kartei aus.',
		'Block title',
		'sha'
	),
	icon,
	category: 'design',
	supports: {
		align: false,
		html: false,
	},
	example: {
		attributes: {
			name: 'Mark Mustermann',
			role: 'Projektleiter',
		},
	},
	attributes: {
		image: {
			type: 'Object',
			default: {
				id: false,
			},
		},
		name: {
			type: 'string',
		},
		role: {
			type: 'string',
		},
	},
	edit: ({ attributes, setAttributes }) => {
		const { image, name, role } = attributes;
		const isUploadingMedia = !image.id && isBlobURL(image.url);
		const blockProps = useBlockProps();

		const setImageAttributes = (image) => {
			if (!image || !image.url) {
				setAttributes({
					image: { id: false },
				});
				return;
			}

			setAttributes({ image });
		};

		return [
			<>
				{image.id && !isUploadingMedia && (
					<BlockControls>
						<MediaReplaceFlow
							mediaId={image.id}
							mediaUrl={image.url}
							allowedTypes={['image']}
							accept="image/*"
							onSelect={setImageAttributes}
							name={
								!image.id
									? __('Add Image')
									: __('Replace Image')
							}
						/>
					</BlockControls>
				)}

				<div {...blockProps}>
					<div className={`${classNameBase}__inner`}>
						<div className={`${classNameBase}__figurewrap`}>
							<>
								{isUploadingMedia && (
									<MediaUploadLoadingImage
										classNameBase={classNameBase}
										image={image}
										isUploadingMedia={isUploadingMedia}
									/>
								)}
								{!isUploadingMedia && (
									<MediaPlaceholder
										accept="image/*"
										allowedTypes={['image']}
										onSelect={setImageAttributes}
										multiple={false}
										handleUpload={true}
										value={image.id}
										disableMediaButtons={image.id}
									/>
								)}
							</>

							{image.url && (
								<FigureHtml
									image={image}
									classNameBase={classNameBase}
								/>
							)}
						</div>
						<div className={`${classNameBase}__contentwrap`}>
							<RichText
								tagName="p"
								placeholder={_x(
									'Gebe Sie einen Namen ein…',
									'Field placeholder',
									'sha'
								)}
								className={`${classNameBase}__name`}
								value={name}
								allowedFormats={[]}
								multiline={false}
								keepPlaceholderOnFocus={true}
								onChange={(name) => {
									setAttributes({ name });
								}}
							/>
							<RichText
								tagName="p"
								placeholder={_x(
									'Geben Sie eine Rolle ein…',
									'Field placeholder',
									'sha'
								)}
								className={`${classNameBase}__role`}
								value={role}
								allowedFormats={[]}
								multiline={false}
								keepPlaceholderOnFocus={true}
								onChange={(role) => {
									setAttributes({ role });
								}}
							/>
						</div>
					</div>
				</div>
			</>,
		];
	},
	save({ attributes }) {
		const { image, name, role } = attributes;

		if (!image.id && !name && !role) {
			return null;
		}

		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				{image.id && (
					<div className={`${classNameBase}__figurewrap`}>
						<FigureHtml
							image={image}
							classNameBase={classNameBase}
						/>
					</div>
				)}
				<div className={`${classNameBase}__contentwrap`}>
					<RichText.Content
						className={`${classNameBase}__name`}
						value={name}
						tagName="p"
					/>
					<RichText.Content
						className={`${classNameBase}__role`}
						value={role}
						tagName="p"
					/>
				</div>
			</div>
		);
	},
});
