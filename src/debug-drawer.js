export default class DebugDrawer {

    constructor(ctx, pixelsPerMeter) {
        this.ctx = ctx;
        this.pixelsPerMeter = pixelsPerMeter;
    }

    drawRect(vertices, vertexCount, color, lineWidth) {
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgb(${color.r * 255},` +
            `${color.g * 255},` + `${color.b * 255})`;
        this.ctx.moveTo(vertices[0].x * this.pixelsPerMeter,
            vertices[0].y * this.pixelsPerMeter);
        this.ctx.lineTo(vertices[1].x * this.pixelsPerMeter,
            vertices[1].y * this.pixelsPerMeter);
        this.ctx.lineTo(vertices[2].x * this.pixelsPerMeter,
            vertices[2].y * this.pixelsPerMeter);
        this.ctx.lineTo(vertices[3].x * this.pixelsPerMeter,
            vertices[3].y * this.pixelsPerMeter);
        this.ctx.lineTo(vertices[0].x * this.pixelsPerMeter,
            vertices[0].y * this.pixelsPerMeter);
        this.ctx.stroke();
    }

    drawCircle(center, radius, color, lineWidth) {
        let angle = 0;
        const angleStep = 20;
        const n = 360 / angleStep;
        radius = radius * this.pixelsPerMeter;

        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgb(${color.r * 255},` +
            `${color.g * 255},` + `${color.b * 255})`;

        let x = radius * Math.cos(angle * Math.PI / 180);
        let y = radius * Math.sin(angle * Math.PI / 180);
        this.ctx.moveTo(x, y);
        angle += angleStep;

        for (let i = 0; i < n; i++) {
            x = radius * Math.cos(angle * Math.PI / 180);
            y = radius * Math.sin(angle * Math.PI / 180);
            this.ctx.lineTo(x, y);
            angle += angleStep;
        }
        this.ctx.stroke();
    }

    DrawSolidPolygon(vertices, vertexCount, color) {
        this.drawRect(vertices, vertexCount, color, 3);
    }

    DrawPolygon(vertices, vertexCount, color) {
        this.drawRect(vertices, vertexCount, color, 3);
    }

    DrawCircle(center, radius, color) {
        this.drawCircle(center, radius, color, 3);
    }

    DrawSolidCircle(center, radius, axis, color) {
        this.drawCircle(center, radius, color, 3);
    }

    PushTransform(xf) {
        this.ctx.save();
        this.ctx.translate(xf.p.x * this.pixelsPerMeter,
            xf.p.y * this.pixelsPerMeter);
        this.ctx.rotate(xf.q.GetAngle());
    }

    PopTransform(xf) {
        this.ctx.restore();
    }

    DrawSegment(p1, p2, color) {}
    DrawTransform(xf) {}
    DrawPoint(p, size, color) {}
}
