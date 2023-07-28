/**
 * SuccessCode을 제외한 서버로 부터 응답받은 ErrorType 을 관리하는 객체
 *
 * @property {'push' | 'show'} type - 처리 유형
 * 'push': router.push()를 사용한 리다이렉트
 * 'show': 데이터를 반환
 *
 * @property {string} name - 리다이렉트할 페이지 이름
 */
export const ErrorTypeResponseManager = {
    '1001': {
        type: 'push',
        redirectRouteName: 'SignIn',
    },
    '1002': {
        type: 'push',
        redirectRouteName: 'Home',
    },
    '1003': {
        type: 'push',
        redirectRouteName: 'SignIn',
    },
    '1005': {
        type: 'push',
        redirectRouteName: 'Home',
    },



    '2001': {
        type: 'show',
    },
    '2002': {
        type: 'show',
    },
    '2003': {
        type: 'show',
    },
    '2004': {
        type: 'show',
    },



    '3001': {
        type: 'show',
    },



    '4001': {
        type: 'show',
    },
    '4002': {
        type: 'show',
    },



    '6001': {
        type: 'show',
    },
    '6002': {
        type: 'show',
    },
    '6003': {
        type: 'show',
    },
    '6004': {
        type: 'show',
    },
    '6005': {
        type: 'show',
    },
    '6006': {
        type: 'show',
    },
    '6007': {
        type: 'show',
    },
    '6008': {
        type: 'show',
    },
    '6009': {
        type: 'show',
    },
    '6010': {
        type: 'show',
    },



    '7001': {
        type: 'show',
    },
    '7002': {
        type: 'show',
    },
    '7003': {
        type: 'show',
    },



    '8001': {
        type: 'show',
    },
    '8002': {
        type: 'show',
    },
    '8003': {
        type: 'show',
    },
    '8004': {
        type: 'show',
    },



    '9001': {
        type: 'show',
    },
    '9002': {
        type: 'push',
        redirectRouteName: 'NotFound',
    },
    '9999': {
        type: 'push',
        redirectRouteName: 'ServiceNotAvailable',
    },
};
