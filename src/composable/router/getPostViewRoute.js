/**
 * 게시글 유형에 따른 라우트 베이스 URL 반환하는 컴포저블
 * 
 * @param {string} postGroup - 게시글 유형을 나타내는 문자열
 * @returns {string} 해당 게시글 유형에 대한 라우트 베이스 URL 반환
 */
export function useGetPostViewRouteBaseURL(postGroup) {
    switch (postGroup) {
        case "NOTICE":
            return `/notices/`;
        case "COMMUNITY":
            return `/communities/`;
        case "PHOTO":
            return `/photos/`;
        case "INQUIRY":
            return `/inquiries/`;
        default:
            return "/";
    }
}

