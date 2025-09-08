import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';

import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import { useSidebarClose } from 'src/hooks/useSidebarClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialValues: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialValues,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draft, setDraft] = useState<ArticleStateType>(initialValues);

	useEffect(() => {
		setDraft(initialValues);
	}, [initialValues]);

	const handleChange =
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setDraft((prev) => ({ ...prev, [key]: option }));
		};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(draft);
		setIsOpen(false);
	};

	const handleReset = () => {
		setDraft(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	const asideRef = useSidebarClose(() => setIsOpen(false));

	return (
		<>
			{!isOpen && (
				<div className={styles.arrowButtonWrapper}>
					<ArrowButton isOpen={false} onClick={() => setIsOpen(true)} />
				</div>
			)}

			{isOpen && (
				<>
					<ArrowButton isOpen onClick={() => setIsOpen(false)} />
					<aside
						ref={asideRef}
						className={clsx(styles.container, {
							[styles.container_open]: isOpen,
						})}>
						<form className={styles.form} onSubmit={handleSubmit}>
							<h1 className={styles.title}>Задайте параметры</h1>
							<Select
								title='Шрифт'
								selected={draft.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={handleChange('fontFamilyOption')}
							/>

							<RadioGroup
								title='Размер шрифта'
								name='fontSizeOption'
								options={fontSizeOptions}
								selected={draft.fontSizeOption}
								onChange={handleChange('fontSizeOption')}
							/>

							<Select
								title='Цвет шрифта'
								selected={draft.fontColor}
								options={fontColors}
								onChange={handleChange('fontColor')}
							/>

							<div className={styles.sectionGap} />

							<Select
								title='Цвет фона'
								selected={draft.backgroundColor}
								options={backgroundColors}
								onChange={handleChange('backgroundColor')}
							/>

							<Select
								title='Ширина контента'
								selected={draft.contentWidth}
								options={contentWidthArr}
								onChange={handleChange('contentWidth')}
							/>

							<div className={styles.bottomContainer}>
								<Button
									title='Сбросить'
									htmlType='button'
									type='clear'
									onClick={handleReset}
								/>
								<Button title='Применить' htmlType='submit' type='apply' />
							</div>
						</form>
					</aside>
				</>
			)}
		</>
	);
};
