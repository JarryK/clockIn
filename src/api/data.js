import { httpRequest } from "@/utils/httpRequest";

export const getClickInfo = () => {
    return httpRequest('/getClockInfo', 'get',{key:'IA24ucyqsWflep2'}, false)
}