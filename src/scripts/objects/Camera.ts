import Plane from "./Plane";
import Ray from "./Ray";
import Transformation from "./Transformation";
import Vector from "./Vector"


class Camera {
    public focal_point: Vector;
    public transformation_forward: Transformation;
    public transformation_backward: Transformation;
    public direction: Vector;
    public sensor: Plane;

    private sensor_size: [number, number] = [.036, .024];

    public constructor(
        position: Vector,
        rotation: [number, number, number],
    ) {
        this.focal_point = position;
        this.transformation_forward = Transformation.from_euler_xyz(rotation[0], rotation[1], rotation[2]);
        this.transformation_backward = Transformation.from_euler_xyz(0, 0, -rotation[2]);
        this.transformation_backward.chain(Transformation.from_euler_xyz(0, -rotation[1], 0));
        this.transformation_backward.chain(Transformation.from_euler_xyz(-rotation[0], 0, 0));
        this.direction = this.transformation_forward.apply(new Vector(0, .025, 0));
        let sensor_center = this.focal_point.clone();
        sensor_center.add_vector(this.direction);
        this.sensor = new Plane(sensor_center.x, sensor_center.y, sensor_center.z, this.direction.x, this.direction.y, this.direction.z);
    }

    public project_on_sensor(point: Vector): [number, number] {
        let ray = Ray.from_points(point, this.focal_point);
        if (ray.direction.dot(this.sensor.normal) > 0) {
            throw new Error("No ray-plane collision");
        }
        let intersection = ray.intersect(this.sensor);
        intersection.subtract_vector(this.focal_point);
        intersection = this.transformation_backward.apply(intersection);
        return [intersection.x / this.sensor_size[0], intersection.z / this.sensor_size[1]];
    }

    public translate_point_on_sensor(point: Vector): [number, number] {
        point.subtract_vector(this.focal_point);
        point = this.transformation_backward.apply(point);
        return [point.x / this.sensor_size[0], point.z / this.sensor_size[1]];
    }
}


export default Camera;
