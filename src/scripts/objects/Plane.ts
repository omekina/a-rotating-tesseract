import Vector from "./Vector"


class Plane {
    public point: Vector;
    public normal: Vector;

    public constructor(
        point_x: number,
        point_y: number,
        point_z: number,
        normal_x: number,
        normal_y: number,
        normal_z: number,
    ) {
        this.point = new Vector(point_x, point_y, point_z);
        this.normal = new Vector(normal_x, normal_y, normal_z);
    }
}


export default Plane;
