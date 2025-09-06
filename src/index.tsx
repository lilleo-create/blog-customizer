import { createRoot } from 'react-dom/client';
import { StrictMode, useState, CSSProperties } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const fontSizeOptions = [
		{ title: '38px', value: '38px', className: '' },
		{ title: '40px', value: '40px', className: '' },
		{ title: '42px', value: '42px', className: '' },
	];
	const [selectedSize, setSelectedSize] = useState(fontSizeOptions[0]);
	const [isOpen, setIsOpen] = useState(false);
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = (nextSettings: ArticleStateType) => {
		setArticleSettings(nextSettings);
		setIsOpen(false);
	};

	const handleReset = () => {
		setArticleSettings(defaultArticleState);
		setIsOpen(false);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			{!isOpen && (
				<div className={styles.arrowButtonWrapper}>
					<ArrowButton isOpen={false} onClick={() => setIsOpen(true)} />
				</div>
			)}

			{isOpen && (
				<ArticleParamsForm
					isOpen={true}
					initialValues={articleSettings}
					onApply={handleApply}
					onReset={handleReset}
					onClose={handleClose}
				/>
			)}

			<Article />
			<RadioGroup
				name='radio'
				title='Размер шрифта'
				options={fontSizeOptions}
				selected={selectedSize}
				onChange={setSelectedSize}
			/>
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
