import { useState } from 'react';
import Button from './assets/Button/Button';

function Counter() {
	const [count, setCount] = useState(0);
	const setCounterHandler = () => {
		setCount(count + 1);
	};
	return <Button onClick={setCounterHandler}>count is {count}</Button>;
}

export default Counter;
