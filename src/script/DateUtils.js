const dateUtils = {
    /**
     * 현재 날짜를 가져오는 함수
     *
     * @returns {string} "YYYY-MM-DD" 형식의 날짜 문자열
     */
    getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * 지정된 날짜에서 일정 기간을 뺀 날짜를 계산하는 함수
     *
     * @param {number} period - 뺄 일 수
     * @param {Date} [startDate=new Date()] - 기준 날짜 (기본값: 현재 날짜)
     * @returns {string} "YYYY-MM-DD" 형식의 날짜 문자열
     */
    getPastDate(period, startDate = new Date()) {
        startDate.setDate(startDate.getDate() - period);
        const year = startDate.getFullYear();
        const month = String(startDate.getMonth() + 1).padStart(2, '0');
        const day = String(startDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * "YYYY-MM-DDTHH:mm:ss" 형식의 날짜를 "YYYY-MM-DD HH시mm분" 형식으로 변환하는 함수
     *
     * @param {string} dateString - 변환할 날짜 문자열
     * @returns {string} "YYYY-MM-DD HH시mm분" 형식의 날짜 문자열
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}시${minutes}분`;
    }
};

export default dateUtils;
