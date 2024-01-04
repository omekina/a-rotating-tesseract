import Vector4 from "./Vector4";
import Camera4 from "./Camera4";
import Mesh from "../objects/Mesh";
import Vector from "../objects/Vector";


export enum RotationPlanes4 {
    XW,
    YW,
    ZW
}


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

    public rotate(rotation_plane: RotationPlanes4, angle: number): void {
        angle = angle * Math.PI / 180;
        if (rotation_plane === RotationPlanes4.XW) {
            for (let i = 0; i < this.vertices.length; i++) {
                const current_vertex = this.vertices[i].clone();
                this.vertices[i].x = current_vertex.x * Math.cos(angle) - current_vertex.w * Math.sin(angle);
                this.vertices[i].w = current_vertex.x * Math.sin(angle) + current_vertex.w * Math.cos(angle);
            }
            return;
        }
        if (rotation_plane === RotationPlanes4.YW) {
            for (let i = 0; i < this.vertices.length; i++) {
                const current_vertex = this.vertices[i].clone();
                this.vertices[i].y = current_vertex.y * Math.cos(angle) - current_vertex.w * Math.sin(angle);
                this.vertices[i].w = current_vertex.y * Math.sin(angle) + current_vertex.w * Math.cos(angle);
            }
            return;
        }
        if (rotation_plane === RotationPlanes4.ZW) {
            for (let i = 0; i < this.vertices.length; i++) {
                const current_vertex = this.vertices[i].clone();
                this.vertices[i].z = current_vertex.z * Math.cos(angle) - current_vertex.w * Math.sin(angle);
                this.vertices[i].w = current_vertex.z * Math.sin(angle) + current_vertex.w * Math.cos(angle);
            }
            return;
        }
        console.error("Invalid 4D rotation plane");
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
