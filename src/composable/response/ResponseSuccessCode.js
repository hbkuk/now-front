/**
 * HTTP 요청의 성공 상태 코드를 정의하는 객체
 */
export const ResponseSuccessCode = {
    GET: 200,
    POST: {
        OK: 200,
        CREATED: 201
    },
    PUT: 201,
    DELETE: 204,
}
