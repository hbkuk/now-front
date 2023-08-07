/**
 * 라우트 이름 그룹을 정의
 *
 * @typedef {Object} RouteNameGroup
 * @property {string} label - 라우트 그룹의 라벨(표시할 이름).
 * @property {Array<string>} routes - 라우트 이름들의 배열.
 */
export const ROUTE_NAME_GROUP = {
    NOTICE: {
        code: "NOTICE",
        label: "공지사항",
        routes: ['Notices', 'NoticePost', 'NoticeForm', 'NoticeEdit']
    },
    COMMUNITY: {
        code: "COMMUNITY",
        label: "커뮤니티",
        routes: ['Communities', 'CommunityPost', 'CommunityForm', 'CommunityEdit']
    },
    PHOTO: {
        code: "PHOTO",
        label: "사진",
        routes: ['Photos', 'PhotoPost', 'PhotoForm', 'PhotoEdit']
    },
    INQUIRY: {
        code: "INQUIRY",
        label: "문의",
        routes: ['Inquiries', 'InquiryPost', 'InquiryForm']
    },
};
