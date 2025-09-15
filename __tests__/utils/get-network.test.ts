import { describe, expect, it } from "vitest";

import { getNetwork } from "../../src/utils";

const profiles = [
    {
        network: "Twitter",
        url: "https://twitter.com/siliconHBO",
        username: "siliconHBO",
    },
    {
        network: "Facebook",
        url: "https://www.facebook.com/SiliconHBO",
        username: "SiliconHBO",
    },
    {
        network: "Instagram",
        url: "https://www.instagram.com/siliconhbo/",
        username: "siliconhbo",
    },
];

describe(getNetwork, () => {
    it("returns network profile", () => {
        expect.assertions(1);

        expect(getNetwork(profiles, "twitter")).toStrictEqual({
            network: "Twitter",
            url: "https://twitter.com/siliconHBO",
            username: "siliconHBO",
        });
    });

    it("returns undefined", () => {
        expect.assertions(1);

        expect(getNetwork(profiles, "test")).toBeUndefined();
    });
});
