export const required = (value: any) => (value || typeof value === 'number' ? undefined : 'Required');

export const maxLength = (value: any) => (value && value.length > 15 ? `Must be ${15} characters or less` : undefined);

export const normalizePhone = (value: any) => {
	if (!value) {
		return value;
	}

	const onlyNums = value.replace(/[^\d]/g, '');
	if (onlyNums.length <= 3) {
		return onlyNums;
	}
	if (onlyNums.length <= 7) {
		return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
	}
	return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
};

export const parseGender = (value: any) => {
	return +value;
};

export const phoneNumber = (value: any) => {
	return value && !/^([0-9]{3})-([0-9]{3})-([0-9]{4})$/i.test(value)
		? 'Invalid phone number, must be 10 digits'
		: undefined;
};

export const alphaNumeric = (value: any) => {
	return value && /[^a-zA-Z0-9 ]/i.test(value)
		? 'Only alphanumeric characters'
		: undefined;
};
