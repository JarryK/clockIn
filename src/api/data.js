import { httpRequest } from "@/utils/httpRequest";

export const getClickInfo = () => {
    return httpRequest('/getClockInfo', 'get',{key:'IA24ucyqsWflep2'}, false)
}

export const appendClickInfo = (num) => {
    return httpRequest('/appendClockInfo', 'post',{key:'IA24ucyqsWflep2', num: num}, false)
}