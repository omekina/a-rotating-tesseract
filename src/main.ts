import RenderEngine from "./scripts/RenderEngine";
import Camera from "./scripts/objects/Camera";
import Transformation from "./scripts/objects/Transformation";
import Vector from "./scripts/objects/Vector";
import Mesh4 from "./scripts/objects4/Mesh4";
import Vector4 from "./scripts/objects4/Vector4";
import Camera4 from "./scripts/objects4/Camera4";


let last_camera = new Camera(new Vector(0, -2, 1), [-30, 0, 0]);
let camera4: Camera4 = new Camera4();
let tesseract: Mesh4 = new Mesh4([
    new Vector4(-1, -1, -1, -1),
    new Vector4(-1, -1, 1, -1),
    new Vector4(-1, 1, 1, -1),
    new Vector4(-1, 1, -1, -1),
    new Vector4(-1, -1, -1, -1),
]);
tesseract.extrude(new Vector4(2, 0, 0, 0));
tesseract.extrude(new Vector4(0, 0, 0, 2));


function run(): void {
    update();
    window.addEventListener("mousemove", rotate_camera);
}


function rotate_camera(event: MouseEvent): void {
    const canvas_bounding_box = RenderEngine.canvas.getBoundingClientRect();
    const rotate_x = - (event.clientX - (canvas_bounding_box.left + RenderEngine.canvas.width / 2)) / (RenderEngine.canvas.width / 2);
    const rotate_y = - (event.clientY - (canvas_bounding_box.top + RenderEngine.canvas.height / 2)) / (RenderEngine.canvas.height / 2);
    const camera_transformation: Transformation = Transformation.from_euler_xyz(rotate_y * 90, 0, rotate_x * 90);
    const current_camera = new Camera(camera_transformation.apply(new Vector(0, -1.5, 0)), [rotate_y * 90, 0, rotate_x * 90]);
    last_camera = current_camera;
    update();
}


function update(): void {
    RenderEngine.clear();
    RenderEngine.axis(last_camera);
    tesseract.project(camera4).render(last_camera);
}


RenderEngine.init();

run();
