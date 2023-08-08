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

describe("getNetwork", () => {
    it("returns network profile", () => {
        expect(getNetwork(profiles, "twitter")).toEqual({
            network: "Twitter",
            url: "https://twitter.com/siliconHBO",
            username: "siliconHBO",
        });
    });

    it("returns undefined", () => {
        expect(getNetwork(profiles, "test")).toEqual(undefined);
    });
});
