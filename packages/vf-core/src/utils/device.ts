export function isMobile() {
    const ua = navigator.userAgent.toLowerCase();
    const mobileRegex = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|windows phone|phone|webos|kindle|tablet/i;
    return mobileRegex.test(ua);
}
