import gravatar from "gravatar";

export default function getGravatarUrl(email: string): string {
    return gravatar.url(email.replace("(at)", "@"), {
        d: "mm",
        r: "pg",
        s: "100",
    });
}
