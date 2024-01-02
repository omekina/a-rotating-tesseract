import Plane from "./Plane";
import Vector from "./Vector";


class Ray {
    public origin: Vector;
    public direction: Vector;

    public constructor(
        origin_x: number,
        origin_y: number,
        origin_z: number,
        direction_x: number,
        direction_y: number,
        direction_z: number,
    ) {
        this.origin = new Vector(origin_x, origin_y, origin_z);
        this.direction = new Vector(direction_x, direction_y, direction_z);
    }

    public static from_points(a: Vector, b: Vector): Ray {
        let diff = b.clone();
        diff.subtract_vector(a);
        return new Ray(a.x, a.y, a.z, diff.x, diff.y, diff.z);
    }

    public normalize(): void {
        let scaling_factor = this.direction.length();
        this.direction.multiply(1 / scaling_factor);
    }


    private intersection_epsilon: number = .001;

    public intersect(plane: Plane): Vector {
        let relative_scaling_factor = this.direction.dot(plane.normal);
        if (Math.abs(relative_scaling_factor) < this.intersection_epsilon) {
            throw new Error("No ray-plane collision");
        }
        let absolute_scaling_factor_vector = plane.point.clone();
        absolute_scaling_factor_vector.subtract_vector(this.origin);
        let absolute_scaling_factor = absolute_scaling_factor_vector.dot(plane.normal) / relative_scaling_factor;
        if (absolute_scaling_factor < 0) {
            throw new Error("No ray-plane collision");
        }
        let intersection = this.direction.clone();
        intersection.multiply(absolute_scaling_factor);
        intersection.add_vector(this.origin);
        return intersection;
    }
}


export default Ray;
