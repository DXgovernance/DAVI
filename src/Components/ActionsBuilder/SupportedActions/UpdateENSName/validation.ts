export const isEnsName = (name: string) => {
    const ensNameRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}/;
    return ensNameRegex.test(name);
}

export const isIPFSHash = (value: string) => {
    const ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$/;
    return ipfsHashRegex.test(value);
}