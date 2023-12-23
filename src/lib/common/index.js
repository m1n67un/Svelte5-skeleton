// @ts-ignore
import download from 'downloadjs';
// @ts-ignore
import CryptoJS from 'crypto-js';

export const common = {
    // @ts-ignore
    getCallAPI: async (url) => {
        let res = await fetch(`${url}`, {
            method: 'GET'
        });

        let result = await res.json();

        if(result == undefined || result == null) {
            alert(import.meta.env.VITE_MSG_CALL_FAIL);
            return false;
        }

        return result;
    },
    // @ts-ignore
    callAPI: async (url, body) => {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_API_PATH}${url}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': import.meta.env.VITE_API_HEADER_ACCEPT,
            }
        });
        let result = await res.json();

        if(result == undefined || result == null) {
            alert(import.meta.env.VITE_MSG_CALL_FAIL);
            return false;
        }

        return result;
    },
    // @ts-ignore
    formAPI: async (url, form) => {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_API_PATH}${url}`, {
                method: 'POST',
                body: form,
                headers: {
                }
            });
            
        let result = await res.json();

        if(result == undefined || result == null) {
            alert(import.meta.env.VITE_MSG_CALL_FAIL);
            return false;
        }

        return result;
    },
    // @ts-ignore
    pagingListProcess: async (value, result, list) => {
        let obj = {};
        switch (result.statusCode) {
            case 0:
                obj.empty = list.empty;
                obj.currentPage = Number(list.number)+1;
                obj.totalPages = list.totalPages;
                obj.totalElements = list.totalElements;

                if(result.data.ctstnm != undefined) {
                    obj.ctstnm = result.data.ctstnm.ctstnm;
                }
                if(result.data.cntstat != undefined) {
                    obj.cntstat = result.data.cntstat;
                }

                list = list.content;
                break;
            default:
                obj.empty = true;
                obj.currentPage = '1';
                obj.totalPages = '1';
                obj.totalElements = '0';
                list = [];
                break;
        }
        return [
            value = {...value, ...obj}, 
            list
        ]
    },
    // @ts-ignore
    listProcess: async (result, list) => {
        let listArray = [];
        switch (result.statusCode) {
            case 0:
                listArray = list;
                break;
            default:
                break;
        }
        return listArray;
    },
    // @ts-ignore
    msgProcess: async (result, path, [msg1, msg2]) => {
        switch (result.statusCode) {
            case 0:
                alert(msg1);
                if(path == null) {
                    location.reload();
                } else {
                    location.href = path;
                }
                break;
            default:
                alert(msg2);
                break;
        }
    },
    // @ts-ignore
    imgError: async ev => {
        ev.target.src = '/common/default.jpg';
    },
    // @ts-ignore
    checkEmail: (str) => {
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (regExp.test(str)) return true;
        else return false;               
    },
    // @ts-ignore
    autoHyphen: async ev => {
        ev.target.value = await ev.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    },
    // @ts-ignore
    autoPrize: async ev => {
        ev.target.value = await ev.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{4})(\d{7})/, `$1-$2`);
    },
    // @ts-ignore
    autoComma: async ev => {
        ev.target.value = await ev.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^0+(?!$)/, "")
            .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },
    // @ts-ignore
    autoLeadingZero: async ev => {
        ev.target.value = await ev.target.value
            .replace(/^0+(?!$)/, "")
    },
    // @ts-ignore
    checkId: (asValue) => {
        var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
        return regExp.test(asValue);
    },
    // @ts-ignore
    checkPwd: (asValue) => {
        var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
	    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
    },
    // @ts-ignore
    checkDate: (date, pattern) => {
        if (date.length != pattern.length) {
            return false;
        }

        let patArr = pattern.split('');
        let datArr = date.split('');
        let yyyy = "";
        let mm = "";
        let dd = "";
        let hh = "";
        let mi = "";
        let ss = "";
        let sss = "";
        let idx = 0;
        for (let s of patArr) {
            if (s === "y") {
                yyyy += datArr[idx];
            } else if (s === "M") {
                mm += datArr[idx];
            } else if (s === "d") {
                dd += datArr[idx];
            } else if (s === "H") {
                hh += datArr[idx];
            } else if (s === "m") {
                mi += datArr[idx];
            } else if (s === "s") {
                ss += datArr[idx];
            } else if (s === "S") {
                sss += datArr[idx];
            } else {
                if (s !== datArr[idx]) {
                    return false;
                }
            }
            idx++;
        }
        // 년과, 월이 없는 경우 윤달 여부로 인해 날자 형식 확인 불가
        if (yyyy === "") {
            return false;
        }
        if (mm === "") {
            return false;
        }
        if (hh === "") {
            hh = "01";
        }
        if (dd === "") {
            dd = "01";
        }
        if (mi === "") {
            mi = "01";
        }
        if (ss === "") {
            ss = "01";
        }
        if (sss === "") {
            sss = "01";
        }
        return !!Date.parse(yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + mi + ":" + ss + "." + sss + "Z");
    },
    // @ts-ignore
    getFormatDate: (date) => {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    },
    // @ts-ignore
    displayFormatDate: (s) => {
        if(s.includes('/')) {
            s = s.replaceAll('/', '');
        }
        return s.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
    },
    // @ts-ignore
    displayFormatAward: (s) => {
        return s.replace(/(\S{4})(\S{4})(\S{4})(\S)/g, '$1-$2-$3-$4')
    },
    // @ts-ignore
    ipAddressToLong: async (ipAddress) => {
        let ipInt = 0;
        let ipArray = ipAddress.split('.');

        let p1 = parseFloat(ipArray[0]) * 256 * 256 * 256;
        let p2 = parseFloat(ipArray[1]) * 256 * 256;
        let p3 = parseFloat(ipArray[2]) * 256;
        let p4 = parseFloat(ipArray[3]);
        
        ipInt = p1 + p2 + p3 + p4;
        return ipInt;
    },
    // @ts-ignore
    urlToDownload: async (url, name) => {
        const res = await fetch(`w?url=${url}`)
        let result = await res.arrayBuffer();
        download(result, name);
    },
    // @ts-ignore
    includeByCho: (search, targetWord) => {
        return makeRegexByCho(search).test(targetWord);
    },
    /**
         * 만 14세 미만인지 체크
         * @param birthDate yyyyMMdd
         * @returns true:만14세미만 어린이
    */
    // @ts-ignore
    isChild: async (birthDate) => {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1); // getMonth()
        var dd  = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
        
        // @ts-ignore
        return parseInt(yyyy+mm+dd) - parseInt(birthDate) - 140000 < 0;
    },
    // @ts-ignore
    cipher: async (param) => {
        let key = 'abcdefghijklmnopqrstuvwxyz123456';
        let string = CryptoJS.AES.encrypt(param, key).toString();

        var hex, i;

        var result = "";
        for (i=0; i<string.length; i++) {
            hex = string.charCodeAt(i).toString(16);
            result += ("000"+hex).slice(-4);
        }

        return result
    },
    // @ts-ignore
    decipher: (param) => {
        let key = 'abcdefghijklmnopqrstuvwxyz123456';
        var j;
        var hexes = param.match(/.{1,4}/g) || [];
        var back = "";
        for(j = 0; j<hexes.length; j++) {
            back += String.fromCharCode(parseInt(hexes[j], 16));
        }

        return CryptoJS.AES.decrypt(back, key).toString(CryptoJS.enc.Utf8);
    },
    // @ts-ignore
    IsJson: (str) => { 
        try {
            var json = JSON.parse(str);
            return (typeof json === 'object');
        } catch (e) {
            return false;
        }
    },
    now: () => {
        var today = new Date();

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);

        var dateString = year + '-' + month  + '-' + day;
        return dateString;
    }
}

const CHO_HANGUL = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
    'ㄹ', 'ㅁ', 'ㅂ','ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
    'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

// @ts-ignore
const HANGUL_START_CHARCODE = "가".charCodeAt();

// @ts-ignore
const CHO_PERIOD = Math.floor("까".charCodeAt() - "가".charCodeAt());
// @ts-ignore
const JUNG_PERIOD = Math.floor("개".charCodeAt() - "가".charCodeAt());

// @ts-ignore
function combine(cho, jung, jong) {
    return String.fromCharCode(
    HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong
    );
}

function makeRegexByCho(search = "") {
    const regex = CHO_HANGUL.reduce(
    (acc, cho, index) =>
        acc.replace(
        new RegExp(cho, "g"),
        `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`
        ),
    search
    );

    return new RegExp(`(${regex})`, "g");
}

export let code = {
    loadingImg: import.meta.env.VITE_IMG_LOADING
}