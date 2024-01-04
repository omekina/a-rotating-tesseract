import Vector from "./Vector";
import Camera from "./Camera";
import RenderEngine from "../RenderEngine";


export enum RotationPlanes {
    XY,
    XZ,
    YZ
}


class Mesh {
    private vertices: Vector[];

    public constructor(in_vertices: Vector[]) {
        this.vertices = in_vertices;
    }

    public extrude(in_direction: Vector): void {
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
        console.log(this.vertices);
        for (let i = 0; i < this.vertices.length; ++i) {
            this.vertices[i].multiply(factor);
        }
    }

    public rotate(rotation_plane: RotationPlanes, angle: number): void {
        angle = angle * Math.PI / 180;
        if (rotation_plane === RotationPlanes.XY) {
            for (let i = 0; i < this.vertices.length; ++i) {
                const current_vertex = this.vertices[i].clone();
                this.vertices[i].x = current_vertex.x * Math.cos(angle) - current_vertex.y * Math.sin(angle);
                this.vertices[i].y = current_vertex.x * Math.sin(angle) + current_vertex.y * Math.cos(angle);
            }
            return;
        }
        if (rotation_plane === RotationPlanes.XZ) {
            for (let i = 0; i < this.vertices.length; ++i) {
                const current_vertex = this.vertices[i].clone();
                this.vertices[i].x = current_vertex.x * Math.cos(angle) - current_vertex.z * Math.sin(angle);
                this.vertices[i].z = current_vertex.x * Math.sin(angle) + current_vertex.z * Math.cos(angle);
            }
            return;
        }
        if (rotation_plane === RotationPlanes.YZ) {
            for (let i = 0; i < this.vertices.length; ++i) {
                const current_vertex = this.vertices[i].clone();
                this.vertices[i].y = current_vertex.y * Math.cos(angle) - current_vertex.z * Math.sin(angle);
                this.vertices[i].z = current_vertex.y * Math.sin(angle) + current_vertex.z * Math.cos(angle);
            }
            return;
        }
        console.error("Invalid 3D rotation plane");
    }

    public render(camera: Camera): void {
        for (let i = 0; i < this.vertices.length - 1; ++i) {
            RenderEngine.line(camera, this.vertices[i], this.vertices[i + 1]);
        }
    }
}


export default Mesh;
