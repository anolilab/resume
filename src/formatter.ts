import type { ResumeSchema } from "@anolilab/resume-schema";
import { format, formatDuration, intervalToDuration } from "date-fns";
// eslint-disable-next-line no-restricted-imports
import capitalize from "lodash.capitalize";

import { getGithubRepoStars, getNetwork, getUrlFromUsername, SocialSites } from "./utils";
import getGravatarUrl from "./utils/get-gravatar-url";

const dateFormat = "MMM yyyy";

const formatter = async (resume: ResumeSchema): Promise<ResumeSchema> => {
    // @ts-expect-error TODO fix types in ResumeSchema
    const { email, picture, profiles } = resume.basics;

    if (!picture && typeof email === "string") {
        // @ts-expect-error TODO fix types in ResumeSchema
        // eslint-disable-next-line no-param-reassign
        resume.basics.picture = getGravatarUrl(email);
    }

    if (resume.languages) {
        // @ts-expect-error TODO fix types in ResumeSchema
        // eslint-disable-next-line no-param-reassign
        resume.basics.languages = resume.languages.map((language) => language.language).join(", ");
    }

    resume.work?.map((workInfo) => {
        const startDate = workInfo.startDate && new Date(workInfo.startDate);
        const endDate: Date | undefined = workInfo.endDate ? new Date(workInfo.endDate) : undefined;

        if (startDate) {
            // eslint-disable-next-line no-param-reassign
            workInfo.startDate = format(startDate, dateFormat);
        }

        if (endDate) {
            // eslint-disable-next-line no-param-reassign
            workInfo.endDate = format(endDate, dateFormat);
        }

        if (startDate) {
            // eslint-disable-next-line no-param-reassign
            workInfo.duration = formatDuration(
                intervalToDuration({
                    end: (endDate ?? new Date()).getTime(),
                    start: startDate.getTime(),
                }),
            );
        }

        if (workInfo.company) {
            // @ts-expect-error TODO fix types in ResumeSchema
            // eslint-disable-next-line no-param-reassign
            workInfo.name = workInfo.company;
        }

        if (workInfo.website) {
            // @ts-expect-error TODO fix types in ResumeSchema
            // eslint-disable-next-line no-param-reassign
            workInfo.url = workInfo.website;
        }

        return workInfo;
    });

    resume.skills?.map((skillInfo) => {
        const levels = ["Beginner", "Intermediate", "Advanced", "Master"];

        if (typeof skillInfo.level === "string" && skillInfo.level.trim() !== "") {
            // eslint-disable-next-line no-param-reassign
            skillInfo.skill_class = skillInfo.level.toLowerCase();
            // eslint-disable-next-line no-param-reassign
            skillInfo.level = capitalize(skillInfo.level.trim());
            // eslint-disable-next-line no-param-reassign
            skillInfo.display_progress_bar = levels.includes(skillInfo.level);
        }

        return skillInfo;
    });

    resume.education?.map((educationInfo) => {
        ["startDate", "endDate"].forEach((date) => {
            if (typeof educationInfo[date] === "string") {
                // eslint-disable-next-line no-param-reassign
                educationInfo[date] = format(new Date(educationInfo[date] as string), dateFormat);
            }
        });

        return educationInfo;
    });

    resume.awards?.map((awardInfo) => {
        if (typeof awardInfo.date === "string") {
            // eslint-disable-next-line no-param-reassign
            awardInfo.date = format(new Date(awardInfo.date), dateFormat);
        }

        return awardInfo;
    });

    resume.publications?.map((publicationInfo) => {
        if (typeof publicationInfo.releaseDate === "string") {
            // eslint-disable-next-line no-param-reassign
            publicationInfo.releaseDate = format(new Date(publicationInfo.releaseDate), "MMM dd, yyyy");
        }

        return publicationInfo;
    });

    resume.volunteer?.map((volunteerInfo) => {
        ["startDate", "endDate"].forEach((date) => {
            if (typeof volunteerInfo[date] === "string") {
                // eslint-disable-next-line no-param-reassign
                volunteerInfo[date] = format(new Date(volunteerInfo[date] as string), dateFormat);
            }
        });

        return volunteerInfo;
    });

    SocialSites.forEach((site) => {
        const socialAccount = getNetwork(profiles, site);

        if (typeof socialAccount === "object") {
            let { url } = socialAccount;

            if (typeof socialAccount.username === "string") {
                url = getUrlFromUsername(site, socialAccount.username) ?? undefined;
            }

            // @ts-expect-error TODO fix types in ResumeSchema
            // eslint-disable-next-line no-param-reassign
            resume.basics[`${site}_url`] = url;
        }
    });

    for (const project of resume.projects ?? []) {
        if (project.githubUrl) {
            // eslint-disable-next-line no-await-in-loop
            project.stars = await getGithubRepoStars(project.githubUrl as string);
        }
    }

    return resume;
};

export default formatter;
