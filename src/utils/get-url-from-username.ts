export default function getUrlFromUsername(site: string, username: string): string | null {
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

    // eslint-disable-next-line security/detect-object-injection
    if (!username || !urlMap[lowerSiteName]) {
        return null;
    }

    if (lowerSiteName === "skype") {
        return `skype:${username}?call`;
    }

    if (lowerSiteName === "reddit" || lowerSiteName === "spotify") {
        // eslint-disable-next-line security/detect-object-injection
        return `//open.${urlMap[site]}/user/${username}`;
    }

    // eslint-disable-next-line security/detect-object-injection
    return `//${urlMap[site]}/${username}`;
}
