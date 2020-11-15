/**
 * a function to encode string to base64
 * @param data : input string to encode
 */
export const base64Encode = (data: string) => {
    const base64Buffer = Buffer.from(data);
    return base64Buffer.toString('base64');
};

/**
 * a function to convert base64 to string
 * @param data : base64 string
 */
export const base64Decode = (data: string) => {
    const base64Buffer = Buffer.from(data, 'base64');
    return base64Buffer.toString('ascii');
};
