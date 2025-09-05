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
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  isOpen: boolean;
  initialValues: ArticleStateType;
  onApply: (settings: ArticleStateType) => void;
  onReset: () => void;
  onClose: () => void;
};

export const ArticleParamsForm = ({
  isOpen,
  initialValues,
  onApply,
  onReset,
  onClose,
}: ArticleParamsFormProps) => {
  const [draft, setDraft] = useState<ArticleStateType>(initialValues);

  useEffect(() => {
    if (isOpen) setDraft(initialValues);
  }, [initialValues, isOpen]);

  const handleChange = (key: keyof ArticleStateType) => (option: OptionType) => {
    setDraft((prev) => ({ ...prev, [key]: option }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onApply(draft);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onClose} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={onReset}>
				<h1 className={styles.title}>Задайте параметры</h1>
          <Select
						title="Шрифт"
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
					title="Цвет шрифта"
            selected={draft.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />

<div className={styles.sectionGap} />

          <Select
					title="Цвет фона"
            selected={draft.backgroundColor}
            options={backgroundColors}
            onChange={handleChange('backgroundColor')}
          />

          <Select
					title="Ширина контента"
            selected={draft.contentWidth}
            options={contentWidthArr}
            onChange={handleChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};
