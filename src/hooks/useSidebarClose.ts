import { useRef } from 'react';
import { useOnClickOutside } from './useOnClickOutside';

export const useSidebarClose = (onClose: () => void) => {
	const ref = useRef<HTMLElement>(null);
	useOnClickOutside(ref, onClose);
	return ref;
};
