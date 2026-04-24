import { useCallback, useState } from 'react';
import { delayFn } from '../helpers/delayFn';
import { toast } from 'react-toastify';

export const useFetch = callback => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchFn = useCallback(async arg => {
		try {
			setIsLoading(true);
			setError('');
			await delayFn();
			const response = await callback(arg);
			return response;
		} catch (error) {
			setError(error.message);
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	}, [callback]);

	return [fetchFn, isLoading, error];
};
