﻿export function required(message?: string): FormValueValidator<any> {
	return {
		message: message || '%name is required.',
		isValid: input => {
			// Damn you, JavaScript. You and your 'truthiness'
			if (typeof input === 'number' && input === 0) return true;

			// Bless you, JavaScript. You and your 'truthiness'
			return !!input;
		}
	};
}

export function minLength(min: number, message?: string): FormValueValidator<string> {
	return {
		message: message || '%name must be at least %min characters.',
		isValid: input => {
			if (!input) return null;
			return input.length >= min
		},
		replacementValues: { min }
	};
}

export function maxLength(max: number, message?: string): FormValueValidator<string> {
	return {
		message: message || '%name must be no longer than %max characters.',
		isValid: input => {
			if (!input) return null;
			return input.length <= max
		},
		replacementValues: { max }
	};
}

export function matches(otherName: string, message?: string): FormValueValidator<string> {
	return {
		message: message || '%name must match %otherName.',
		isValid: (input, formValues) => {
			if (!input) return null;
			return input === formValues[otherName];
		},
		replacementValues: { otherName }
	}
}

export function isEmail(message?: string): FormValueValidator<string> {
	return {
		message: message || '%name must be a valid email address.',
		isValid: input => {
			if (!input) return null;
			return /^\S+@\S+\.\S+$/.test(input);
		}
	}
}

export function matchesRegex(test: RegExp, message: string) :FormValueValidator<string> {
	return {
		message,
		isValid: input => {
			if (!input) return null;
			return test.test(input);
		}
	}
}

export function containsSpecialCharacter(): FormValueValidator<string> {
	return matchesRegex(/[\W_]/, '%name must contain at least one special character.');
}

export function containsNumber(): FormValueValidator<string> {
	return matchesRegex(/\d/, '%name must contain at least one number.');
}

export function containsUpper(): FormValueValidator<string> {
	return matchesRegex(/[A-Z]/, '%name must contain at least one uppercase letter.');
}
export function containsLower(): FormValueValidator<string> {
	return matchesRegex(/[a-z]/, '%name must contain at least one lowercase letter.');
}

/**
 * A function that validates the value of a form field
 */
export type FormValueValidator<T> = {
	/**
	 * The message to use to identify the validator in the form validation result area
	 */
	message: string

	/**
	 * A function used to determine whether the value passes validation. Returns <code>true</code> if the value is valid
	 *
	 * @param input The value to validate
	 */
	isValid: (input: T|null, formValues: Record<string, any>) => boolean|null

	/**
	 * An object of key-value replacement values to use when formatting the validation message
	 */
	replacementValues?: Record<string, any>
}