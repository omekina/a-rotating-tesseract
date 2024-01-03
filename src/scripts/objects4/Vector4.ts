class Vector4 {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    public constructor(in_x: number, in_y: number, in_z: number, in_w: number) {
        this.x = in_x;
        this.y = in_y;
        this.z = in_z;
        this.w = in_w;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    public dot(other: Vector4): number {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    }

    public multiply(factor: number): void {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
        this.w *= factor;
    }

    public add_vector(other: Vector4): void {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        this.w += other.w;
    }

    public subtract_vector(other: Vector4): void {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        this.w -= other.w;
    }

    public add_constant(constant: number): void {
        this.x += constant;
        this.y += constant;
        this.z += constant;
        this.w += constant;
    }

    public clone(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }
}


export default Vector4;
