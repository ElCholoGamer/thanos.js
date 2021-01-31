class GemsMissingError extends Error {
	public constructor(message?: string | undefined) {
		super(message);
	}
}

export default GemsMissingError;
