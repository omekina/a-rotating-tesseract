import Vector4 from "./Vector4";
import Vector from "../objects/Vector";


/**
 * A camera in 4D space.
 * Is limited to a simple infinite sensor orthogonal to world axes.
 */
class Camera4 {
    public focal_point: Vector4;
    private static readonly sensor_w: number = -2;

    public constructor(in_focal_length: number = 1) {
        this.focal_point = new Vector4(0, 0, 0, Camera4.sensor_w - in_focal_length);
    }

    public project(in_point: Vector4): Vector {
        let ray_direction = this.focal_point.clone();
        ray_direction.subtract_vector(in_point);
        const ray_factor = (Camera4.sensor_w - in_point.w) / ray_direction.w;
        ray_direction.multiply(ray_factor);
        ray_direction.add_vector(in_point);
        return new Vector(ray_direction.x, ray_direction.y, ray_direction.z);
    }
}


export default Camera4;
