import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup } from './RadioGroup';
import { useState } from 'react';

const meta: Meta<typeof RadioGroup> = {
	component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const RadioGroupWithState = () => {
	const options = [
		{ title: '38px', value: '38px', className: '' },
		{ title: '40px', value: '40px', className: '' },
		{ title: '42px', value: '42px', className: '' },
		{ title: '44px', value: '44px', className: '' },
	];
	const [selected, setSelected] = useState(options[0]);

	return (
		<>
			<RadioGroup
				selected={selected}
				name='radio'
				onChange={setSelected}
				options={options}
				title='Название радиогруппы'
			/>
		</>
	);
};

export const RadioGroupStory: Story = {
	render: () => <RadioGroupWithState />,
};
