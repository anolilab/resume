import { url } from "gravatar";

export default function getGravatarUrl(email: string): string {
    return url(email.replace("(at)", "@"), {
        d: "mm",
        r: "pg",
        s: "100",
    });
}
