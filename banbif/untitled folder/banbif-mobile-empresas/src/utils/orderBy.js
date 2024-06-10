export class OrderBy {
	static order(attr) {
		return (a, b) => {
			if (a[attr] < b[attr])
				return -1;
			if (a[attr] > b[attr])
				return 1;
			return 0;
		}
	}
}
