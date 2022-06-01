import gravatar from "gravatar";

export default function getGravatarUrl(email: string) {
    return gravatar.url(email.replace("(at)", "@"), {
        s: "100",
        r: "pg",
        d: "mm",
    });
}
