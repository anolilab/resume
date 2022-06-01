export default function getUrlFromUsername(site: string, username: string): string | null {
    const urlMap: { [key: string]: string } = {
        github: "github.com",
        twitter: "twitter.com",
        soundcloud: "soundcloud.com",
        pinterest: "pinterest.com",
        vimeo: "vimeo.com",
        behance: "behance.net",
        codepen: "codepen.io",
        foursquare: "foursquare.com",
        reddit: "reddit.com",
        spotify: "spotify.com",
        dribble: "dribbble.com",
        dribbble: "dribbble.com",
        facebook: "facebook.com",
        angellist: "angel.co",
        bitbucket: "bitbucket.org",
    };

    const lowerSiteName = site.toLowerCase();

    if (!username || !urlMap[lowerSiteName]) {
        // eslint-disable-next-line unicorn/no-null
        return null;
    }

    if (lowerSiteName === "skype") {
        return `skype:${username}?call`;
    }

    if (lowerSiteName === "reddit" || lowerSiteName === "spotify") {
        return `//open.${urlMap[site]}/user/${username}`;
    }

    return `//${urlMap[site]}/${username}`;
}
