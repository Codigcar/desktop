class emailHide {

	hide(value) {
		const emailSplitted = value.split('@');
		const hideWord = (word) => word[0] + '*'.repeat(word.length - 2) + word.slice(-1);
		return hideWord(emailSplitted[0]) + '@' + emailSplitted[1];
	}
}

export const EmailHide = new emailHide();