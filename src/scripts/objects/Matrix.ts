class Matrix {
    public data: [[number, number, number], [number, number, number], [number, number, number]];

    public constructor(
        a: number, b: number, c: number,
        d: number, e: number, f: number,
        g: number, h: number, i: number,
    ) {
        this.data = [[a, b, c], [d, e, f], [g, h, i]];
    }

    private determinant(): number {
        return this.data[0][0] * (this.data[1][1] * this.data[2][2] - this.data[2][1] * this.data[1][2]) -
               this.data[0][1] * (this.data[1][0] * this.data[2][2] - this.data[2][0] * this.data[1][2]) +
               this.data[0][2] * (this.data[1][0] * this.data[2][1] - this.data[2][0] * this.data[1][1]);
    }
    
    private transpose(): void {
        this.data = [
            [this.data[0][0], this.data[1][0], this.data[2][0]],
            [this.data[0][1], this.data[1][1], this.data[2][1]],
            [this.data[0][2], this.data[1][2], this.data[2][2]]
        ];
    }

    public invertMatrix() {
        const det = this.determinant();
        
        if (det === 0) {
            throw new Error("Cannot invert a matrix with determinant 0");
        }
    
        const adjugate = [
            [this.data[1][1]*this.data[2][2] - this.data[2][1]*this.data[1][2], this.data[0][2]*this.data[2][1] - this.data[0][1]*this.data[2][2], this.data[0][1]*this.data[1][2] - this.data[0][2]*this.data[1][1]],
            [this.data[1][2]*this.data[2][0] - this.data[1][0]*this.data[2][2], this.data[0][0]*this.data[2][2] - this.data[0][2]*this.data[2][0], this.data[1][0]*this.data[0][2] - this.data[0][0]*this.data[1][2]],
            [this.data[1][0]*this.data[2][1] - this.data[1][1]*this.data[2][0], this.data[0][1]*this.data[2][0] - this.data[0][0]*this.data[2][1], this.data[0][0]*this.data[1][1] - this.data[0][1]*this.data[1][0]]
        ];
    
        const inverse = adjugate.map(row => row.map(element => element / det));
        let result = new Matrix(
            inverse[0][0], inverse[0][1], inverse[0][2],
            inverse[1][0], inverse[1][1], inverse[1][2],
            inverse[2][0], inverse[2][1], inverse[2][2],
        );
        result.transpose();

        this.data = result.data;
    }
    
    public dump_to_console(): void {
        for (let i = 0; i < this.data.length; ++i) {
            let line = "";
            for (let j = 0; j < this.data.length; ++j) { line += this.data[i][j] + " "; }
            console.log(line);
        }
    }
}


export default Matrix;
