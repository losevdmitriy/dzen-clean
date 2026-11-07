/**
 * Options for {@link chrome.declarativeNetRequest.isRegexSupported}.
 */ /**
 * Check if the regex is supported in a browser extension using the built-in chrome.declarativeNetRequest API.
 *
 * @param regexFilter Regex to check.
 *
 * @returns Promise that resolves to true if the regex is supported, and rejects with an error otherwise.
 */ async function regexValidatorExtension(regexFilter) {
    return new Promise((resolve, reject)=>{
        if (typeof chrome !== 'undefined' && chrome.declarativeNetRequest) {
            const regexOptions = {
                regex: regexFilter
            };
            chrome.declarativeNetRequest.isRegexSupported(regexOptions, (result)=>{
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else if (result.isSupported) {
                    resolve(true);
                } else {
                    reject(new Error(result.reason));
                }
            });
        } else {
            reject(new Error('chrome.declarativeNetRequest is not available'));
        }
    });
}

export { regexValidatorExtension };
