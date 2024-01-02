///<reference lib="dom" />


import Camera from "./objects/Camera";
import Ray from "./objects/Ray";
import Vector from "./objects/Vector";


namespace RenderEngine {

    export let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    let width: number;
    let height: number;

    let center_x: number;
    let center_y: number;

    let scale_x: number;
    let scale_y: number;

    export function init(): void {
        let try_canvas = <HTMLCanvasElement | null> document.getElementById("render-canvas");
        if (try_canvas === null) {
            throw new Error("Could not find the rendering canvas");
        }
        canvas = try_canvas;
        width = canvas.width;
        height = canvas.height;
        scale_x = width / 2;
        scale_y = height / 2;
        center_x = width / 2;
        center_y = height / 2;
        context = <CanvasRenderingContext2D> canvas.getContext("2d");
        context.strokeStyle = "white";
        context.beginPath();
    }

    export function clear(): void {
        context.clearRect(0, 0, width, height);
    }

    function trim_project_line(camera: Camera, a: Vector, b: Vector): [number, number, number, number] {
        let position_a_2d: [number, number];
        let position_b_2d: [number, number];
        try {
            position_a_2d = camera.project_on_sensor(a);
        } catch {
            try { position_b_2d = camera.project_on_sensor(b); } catch { throw new Error("Could not project any of the two points"); }
            const line_ray = new Ray(b.x, b.y, b.z, a.x - b.x, a.y - b.y, a.z - b.z);
            let intersection: Vector;
            try { intersection = line_ray.intersect(camera.sensor); } catch { throw new Error("Could not intersect the line with the sensor"); }
            position_a_2d = camera.translate_point_on_sensor(intersection);
            return [position_a_2d[0], position_a_2d[1], position_b_2d[0], position_b_2d[1]];
        }
        try {
            position_b_2d = camera.project_on_sensor(b);
        } catch {
            const line_ray = new Ray(a.x, a.y, a.z, b.x - a.x, b.y - a.y, b.z - a.z);
            let intersection: Vector;
            try { intersection = line_ray.intersect(camera.sensor); } catch { throw new Error("Could not intersect the line with the sensor"); }
            position_b_2d = camera.translate_point_on_sensor(intersection);
            return [position_a_2d[0], position_a_2d[1], position_b_2d[0], position_b_2d[1]];
        }
        return [position_a_2d[0], position_a_2d[1], position_b_2d[0], position_b_2d[1]];
    }

    export function line(camera: Camera, a: Vector, b: Vector, color: string = "white", width: number = 1): void {
        context.strokeStyle = color;
        context.lineWidth = width;
        let position_a_2d: [number, number];
        let position_b_2d: [number, number];
        let positions: [number, number, number, number];
        try {
            positions = trim_project_line(camera, a, b);
        } catch {
            return;
        }
        position_a_2d = [positions[0], positions[1]];
        position_b_2d = [positions[2], positions[3]];
        context.beginPath();
        context.moveTo(center_x + position_a_2d[0] * scale_x, center_y - position_a_2d[1] * scale_y);
        context.lineTo(center_x + position_b_2d[0] * scale_x, center_y - position_b_2d[1] * scale_y);
        context.closePath();
        context.stroke();
    }

    export function grid(camera: Camera, spaces: number = .1): void {
        for (let i = -1 / spaces; i * spaces <= 1; ++i) {
            line(camera, new Vector(-1, i * spaces, 0 ), new Vector(1, i * spaces, 0 ), "white", .5);
            line(camera, new Vector(i * spaces, -1, 0 ), new Vector(i * spaces, 1, 0 ), "white", .5);
        }
    }

    export function axis(camera: Camera, length: number = 1): void {
        line(camera, new Vector(0, 0, 0), new Vector(length, 0, 0), "red", 1);
        line(camera, new Vector(0, 0, 0), new Vector(0, length, 0), "green", 1);
        line(camera, new Vector(0, 0, 0), new Vector(0, 0, length), "blue", 1);
    }
}


export default RenderEngine;
