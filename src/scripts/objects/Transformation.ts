import Vector from "./Vector"


class Transformation {
    public data: [number, number, number, number, number, number, number, number, number];

    public constructor() {
        this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    public static from_euler_xyz(euler_x: number, euler_y: number, euler_z: number): Transformation {
        euler_x = euler_x * Math.PI / 180;
        euler_y = euler_y * Math.PI / 180;
        euler_z = euler_z * Math.PI / 180;
        let result = new Transformation();
        result.data = [
            Math.cos(euler_z) * Math.cos(euler_y),
            Math.cos(euler_z) * Math.sin(euler_y) * Math.sin(euler_x) - Math.sin(euler_z) * Math.cos(euler_x),
            Math.cos(euler_z) * Math.sin(euler_y) * Math.cos(euler_x) + Math.sin(euler_z) * Math.sin(euler_x),
            Math.sin(euler_z) * Math.cos(euler_y),
            Math.sin(euler_z) * Math.sin(euler_y) * Math.sin(euler_x) + Math.cos(euler_z) * Math.cos(euler_x),
            Math.sin(euler_z) * Math.sin(euler_y) * Math.cos(euler_x) - Math.cos(euler_z) * Math.sin(euler_x),
            -Math.sin(euler_y),
            Math.cos(euler_y) * Math.sin(euler_x),
            Math.cos(euler_y) * Math.cos(euler_x)
        ];
        return result;
    }

    public static from_scale(scale_x: number, scale_y: number, scale_z: number): Transformation {
        let result = new Transformation();
        result.data = [
            scale_x, 0, 0,
            0, scale_y, 0,
            0, 0, scale_z,
        ];
        return result;
    }

    public chain(second: Transformation): void {
        let result: number[] = [];
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                let sum = 0;
                for (let k = 0; k < 3; ++k) { sum += second.data[i * 3 + k] * this.data[k * 3 + j]; }
                result.push(sum);
            }
        }
        this.data = <any> result;
    }

    public apply(vector: Vector): Vector {
        return new Vector(
            vector.x * this.data[0] + vector.y * this.data[1] + vector.z * this.data[2],
            vector.x * this.data[3] + vector.y * this.data[4] + vector.z * this.data[5],
            vector.x * this.data[6] + vector.y * this.data[7] + vector.z * this.data[8],
        );
    }

    public to_string(): string {
        let result = "";
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) { result += this.data[i * 3 + j].toFixed(2) + " "; }
            result += "\n";
        }
        return result;
    }
}


export default Transformation;
