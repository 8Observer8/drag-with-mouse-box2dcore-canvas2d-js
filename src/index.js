import ContactListener from "./contact-listener.js";
import DebugDrawer from "./debug-drawer.js";
import { b2AABB } from "@box2d/core";
import { b2BodyType } from "@box2d/core";
import { b2CircleShape } from "@box2d/core";
import { b2PolygonShape } from "@box2d/core";
import { b2Vec2 } from "@box2d/core";
import { b2World } from "@box2d/core";
import { DrawAABBs } from "@box2d/core";
import { DrawShapes } from "@box2d/core";

const canvas = document.getElementById("renderCanvas");
const ctx = canvas.getContext("2d");

let world, debugDrawer;
const pixelsPerMeter = 30;
let lastTime, currentTime, dt;
let mouseX, mouseY, isDragging = false;
let body, angle;
let bodyOffsetX, bodyOffsetY;

function getBodyCallback(fixture) {
    const userData = fixture.GetUserData();
    if (userData) {
        if (userData.name === "box" || userData.name === "box2" || userData.name === "circle") {
            isDragging = true;
            body = fixture.GetBody();
            // body.SetType(b2BodyType.b2_kinematicBody);
            fixture.SetSensor(true);
            angle = body.GetAngle();
            body.SetLinearVelocity(new b2Vec2(0, 0, 0));
            body.SetAngularVelocity(0);

            const bodyPosX = body.GetPosition().x;
            const bodyPosY = body.GetPosition().y;
            bodyOffsetX = mouseX - bodyPosX;
            bodyOffsetY = mouseY - bodyPosY;
        }
    }
}

canvas.onmousedown = (e) => {
    mouseX = (e.clientX - canvas.offsetLeft) / pixelsPerMeter;
    mouseY = (e.clientY - canvas.offsetTop) / pixelsPerMeter;

    const aabb = new b2AABB();
    aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
    aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
    world.QueryAABB(aabb, getBodyCallback);
}

canvas.onmouseup = (e) => {
    if (isDragging) {
        isDragging = false;
        body.SetType(b2BodyType.b2_dynamicBody);
    }
}

canvas.onmousemove = (e) => {
    if (isDragging) {
        mouseX = (e.clientX - canvas.offsetLeft) / pixelsPerMeter;
        mouseY = (e.clientY - canvas.offsetTop) / pixelsPerMeter;
        const bodyPosX = body.GetPosition().x;
        const bodyPosY = body.GetPosition().y;
        body.SetTransformXY(mouseX - bodyOffsetX, mouseY - bodyOffsetY, angle);
    }
}

function draw(renderer) {
    currentTime = Date.now();
    dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    world.Step(dt, { velocityIterations: 3, positionIterations: 2 });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fill();
    DrawShapes(debugDrawer, world);
    // DrawAABBs(debugDrawer, world);

    requestAnimationFrame(draw);
}

function init() {
    world = b2World.Create({ x: 0, y: 0 });
    debugDrawer = new DebugDrawer(ctx, pixelsPerMeter);
    const contactListener = new ContactListener();
    world.SetContactListener(contactListener);

    // Ground
    const groundShape = new b2PolygonShape();
    groundShape.SetAsBox(130 / pixelsPerMeter, 20 / pixelsPerMeter);
    const groundBody = world.CreateBody({
        type: b2BodyType.b2_staticBody,
        position: { x: 150 / pixelsPerMeter, y: 270 / pixelsPerMeter }
    });
    const groundFixture = groundBody.CreateFixture({ shape: groundShape });
    groundFixture.SetUserData({ name: "ground" });

    // Box
    const boxShape = new b2PolygonShape();
    boxShape.SetAsBox(30 / pixelsPerMeter, 30 / pixelsPerMeter);
    const boxBody = world.CreateBody({
        type: b2BodyType.b2_dynamicBody,
        position: { x: 100 / pixelsPerMeter, y: 140 / pixelsPerMeter },
        angle: 30 * Math.PI / 180
    });
    const boxFixture = boxBody.CreateFixture({ shape: boxShape, density: 1 });
    boxFixture.SetUserData({ name: "box" });
    boxBody.m_autoSleepFlag = false;

    // Box 2
    const box2Shape = new b2PolygonShape();
    box2Shape.SetAsBox(30 / pixelsPerMeter, 30 / pixelsPerMeter);
    const box2Body = world.CreateBody({
        type: b2BodyType.b2_dynamicBody,
        position: { x: 200 / pixelsPerMeter, y: 50 / pixelsPerMeter },
        angle: 60 * Math.PI / 180
    });
    const box2Fixture = box2Body.CreateFixture({ shape: box2Shape, density: 1 });
    box2Fixture.SetUserData({ name: "box2" });
    box2Body.m_autoSleepFlag = false;

    // Circle
    const circleShape = new b2CircleShape(20 / pixelsPerMeter);
    const circleBody = world.CreateBody({
        type: b2BodyType.b2_dynamicBody,
        position: { x: 200 / pixelsPerMeter, y: 150 / pixelsPerMeter }
    });
    const circleFixture = circleBody.CreateFixture({ shape: circleShape, density: 1 });
    circleFixture.SetRestitution(0.5);
    circleFixture.SetUserData({ name: "circle" });
    circleBody.m_autoSleepFlag = false;

    // Platform
    const platformShape = new b2PolygonShape();
    platformShape.SetAsBox(50 / pixelsPerMeter, 5 / pixelsPerMeter);
    const platformBody = world.CreateBody({
        type: b2BodyType.b2_staticBody,
        position: { x: 220 / pixelsPerMeter, y: 200 / pixelsPerMeter },
        angle: -20 * Math.PI / 180
    });
    const platformFixture = platformBody.CreateFixture({ shape: platformShape });
    platformFixture.SetUserData({ name: "platform" });

    lastTime = Date.now();
    draw();
}

init();
