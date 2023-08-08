interface Profile {
    [p: string]: unknown;
    network?: string;
    url?: string;
    username?: string;
}

export default function getNetwork(profiles: Profile[], network_name: string): Profile | undefined {
    return Object.values(profiles).find((profile) => profile.network?.toLowerCase() === network_name);
}
