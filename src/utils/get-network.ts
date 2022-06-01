type Profile = { network?: string; username?: string; url?: string; [p: string]: unknown };

export default function getNetwork(profiles: Profile[], network_name: string): undefined | Profile {
    return Object.values(profiles).find((profile) => profile?.network?.toLowerCase() === network_name);
}
