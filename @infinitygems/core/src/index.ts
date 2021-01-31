export interface InfinityGemOptions {
	name: string;
	color: string;
	chargeTime: number;
}

abstract class InfinityGem {
	public readonly name: string;
	public readonly color: string;
	public readonly chargeTime: number;

	protected constructor(options: InfinityGemOptions) {
		this.name = options.name;
		this.color = options.color;
		this.chargeTime = options.chargeTime;
	}
}

export default InfinityGem;
