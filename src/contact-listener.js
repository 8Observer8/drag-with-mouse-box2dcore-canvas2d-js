import { b2ContactListener, b2Vec2 } from "@box2d/core";

export default class ContactListener extends b2ContactListener {

    BeginContact(contact) {
        const fixtureA = contact.GetFixtureA();
        const fixtureB = contact.GetFixtureB();
        const userDataA = fixtureA.GetUserData();
        const userDataB = fixtureB.GetUserData();
        if (userDataA && userDataB)
        {
            const nameA = userDataA.name;
            const nameB = userDataB.name;
            console.log(nameA + " <-> " + nameB);
        }
    }
}
