export default function getUrlFromUsername(site: string, username: string): string | undefined {
    const urlMap: Record<string, string> = {
        angellist: "angel.co",
        behance: "behance.net",
        bitbucket: "bitbucket.org",
        codepen: "codepen.io",
        dribbble: "dribbble.com",
        dribble: "dribbble.com",
        facebook: "facebook.com",
        foursquare: "foursquare.com",
        github: "github.com",
        pinterest: "pinterest.com",
        reddit: "reddit.com",
        soundcloud: "soundcloud.com",
        spotify: "spotify.com",
        twitter: "twitter.com",
        vimeo: "vimeo.com",
    };

    const lowerSiteName = site.toLowerCase();

    if (!username || !urlMap[lowerSiteName]) {
        return undefined;
    }

    if (lowerSiteName === "skype") {
        return `skype:${username}?call`;
    }

    if (lowerSiteName === "reddit" || lowerSiteName === "spotify") {
        return `//open.${urlMap[site] as string}/user/${username}`;
    }

    return `//${urlMap[site] as string}/${username}`;
}
