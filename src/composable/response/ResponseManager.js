/**
 * 응답에 대한 처리를 관리하는 객체
 *
 * @property {'push' | 'show'} type - 처리 유형
 * 'push': router.push()를 사용한 리다이렉트
 * 'show': 데이터를 반환
 *
 * @property {string} name - 리다이렉트할 페이지 이름
 */
export const ResponseManager = {
    'PARAM-001': {
        type: 'show',
    },
    'BOARD-001': {
        type: 'show',
    },
    'BOARD-002': {
        type: 'push',
        redirectName: 'NotFound',
    },
    'BOARD-003': {
        type: 'show',
    },
};
