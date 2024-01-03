import Vector4 from "./Vector4";
import Camera4 from "./Camera4";
import Mesh from "../objects/Mesh";
import Vector from "../objects/Vector";


class Mesh4 {
    private vertices: Vector4[];

    public constructor(in_vertices: Vector4[]) {
        this.vertices = in_vertices;
    }

    public extrude(in_direction: Vector4): void {
        const vertices_length = this.vertices.length;
        for (let i = 0; i < vertices_length; ++i) {
            const extruded_vertex = this.vertices[i].clone();
            extruded_vertex.add_vector(in_direction);
            this.vertices.push(extruded_vertex);
        }
        let last_extruded: boolean = true;
        for (let i = 0; i < vertices_length; ++i) {
            const current_vertex = this.vertices[i].clone();
            const extruded_vertex = current_vertex.clone();
            extruded_vertex.add_vector(in_direction);
            if (last_extruded) {
                this.vertices.push(extruded_vertex);
                this.vertices.push(current_vertex);
                last_extruded = false;
                continue;
            }
            this.vertices.push(current_vertex);
            this.vertices.push(extruded_vertex);
            last_extruded = true;
        }
    }

    public scale(factor: number): void {
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].multiply(factor);
        }
    }

    public project(camera: Camera4): Mesh {
        const projected_vertices: Vector[] = [];
        for (let i = 0; i < this.vertices.length; i++) {
            projected_vertices.push(camera.project(this.vertices[i]));
        }
        return new Mesh(projected_vertices);
    }
}


export default Mesh4;
