declare namespace lms {
    let appPath: string;

    let pageLoadTime: Date;

    function toAbsAppPath(path: string): string;
    function toAPIPath(type: string): string;

    namespace utils {
        function createNamespace(root: any, ns: string): any;

        function replaceAll(str: string, search: string, replacement: any): string;

        function formatString(str: string, ...args: any[]): string;

        function toPascalCase(str: string): string;

        function toCamelCase(str: string): string;

        function truncateString(str: string, maxLength: number): string;

        function truncateStringWithPostfix(str: string, maxLength: number, postfix?: string): string;

        function isFunction(obj: any): boolean;

        /**
         * Sets a cookie value for given key.
         * This is a simple implementation created to be used by lms.
         * Please use a complete cookie library if you need.
         * @param {string} key
         * @param {string} value
         * @param {Date} expireDate (optional). If not specified the cookie will expire at the end of session.
         * @param {string} path (optional)
         */
        function setCookieValue(key: string, value: string, expireDate?: Date, path?: string): void;

        /**
         * Gets a cookie with given key.
         * This is a simple implementation created to be used by lms.
         * Please use a complete cookie library if you need.
         * @param {string} key
         * @returns {string} Cookie value or null
         */
        function getCookieValue(key: string): string;

        /**
         * Deletes cookie for given key.
         * This is a simple implementation created to be used by lms.
         * Please use a complete cookie library if you need.
         * @param {string} key
         * @param {string} path (optional)
         */
        function deleteCookie(key: string, path?: string): void;
    }

    namespace security {
        namespace antiForgery {
            let tokenCookieName: string;

            let tokenHeaderName: string;

            function getToken(): string;
        }
    }
}
