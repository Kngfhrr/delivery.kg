import BaseService from './base.service'
const base = new BaseService()

export default class MapService {

    getAddress = async (lat, lon) => {
        try {
            let res = await fetch(
                `https://eu1.locationiq.com/v1/reverse.php?key=57aca5dc70de61&lat=${lat}&lon=${lon}&format=json`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
            return await res.json()
        } catch (e) {
            console.warn('Error while making getJSON in base.service.ts: ', e)
        }
    }
    }