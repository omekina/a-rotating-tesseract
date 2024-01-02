class Vector {
    public x: number;
    public y: number;
    public z: number;

    public constructor(in_x: number, in_y: number, in_z: number) {
        this.x = in_x;
        this.y = in_y;
        this.z = in_z;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public dot(other: Vector): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    public cross(other: Vector): Vector {
        return new Vector(
            other.y * this.z - other.z * this.y,
            other.z * this.x - other.x * this.z,
            other.x * this.y - other.y * this.x
        );
    }

    public multiply(factor: number): void {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
    }

    public add_vector(other: Vector): void {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
    }

    public subtract_vector(other: Vector): void {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
    }

    public add_constant(constant: number): void {
        this.x += constant;
        this.y += constant;
        this.z += constant;
    }

    public clone(): Vector {
        return new Vector(this.x, this.y, this.z);
    }
}


export default Vector;
