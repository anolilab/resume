import { describe, expect, it } from "vitest";

import { getNetwork } from "../../src/utils";

const profiles = [
    {
        network: "Twitter",
        username: "siliconHBO",
        url: "https://twitter.com/siliconHBO",
    },
    {
        network: "Facebook",
        username: "SiliconHBO",
        url: "https://www.facebook.com/SiliconHBO",
    },
    {
        network: "Instagram",
        username: "siliconhbo",
        url: "https://www.instagram.com/siliconhbo/",
    },
];

describe("getNetwork", () => {
    it("returns network profile", () => {
        expect(getNetwork(profiles, "twitter")).toEqual({
            network: "Twitter",
            username: "siliconHBO",
            url: "https://twitter.com/siliconHBO",
        });
    });

    it("returns undefined", () => {
        expect(getNetwork(profiles, "test")).toEqual(undefined);
    });
});
