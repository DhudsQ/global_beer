/**
 * Infrastructure helper for building Logo.dev image URLs.
 * @summary Returns a logo image URL for a given domain using Logo.dev API.
 * @author Student
 */
const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const apiKey     = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

export class LogoDevApi {
    /**
     * Creates a logo URL based on the source host.
     * @param {string} domain
     * @returns {string}
     */
    getUrlToLogo(domain) {
        return `${logoApiUrl}/${new URL(domain).host}?token=${apiKey}`;
    }
}
