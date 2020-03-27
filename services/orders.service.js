import BaseService from './base.service'
const base = new BaseService()

export default class OrderService {
    allOrders = async () => {
        try {
            const res = await base.getJSON(`/deliveries`)
            if (res && res.errors) {
                return {error: res.errors}
            }
            return res
        } catch (e) {
            console.log('Error in OrderService, allOrders ', e)
        }
    }

    oneOrder = async id => {
        try {
            const res = await base.getJSON(`/deliveries/${id}`)
            if (res && res.errors) {
                return {error: res.errors}
            }
            return res
        } catch (e) {
            console.log('Error in OrderService, oneOrder ', e)
        }
    }

    createOrder = async data => {
        try {
            const res = await base.postJSON(`/deliveries`, data)
            if (res && res.errors) {
                return {error: res.errors}
            }
            return res
        } catch (e) {
            console.log('Error in OrderService, createOrder ', e)
        }
    }

    deleteOrder = async (id) => {
        try {
            const res = await base.deleteJSON(`/deliveries/${id}`)
            if (res && res.errors) {
                return {error: res.errors}
            }
            return res
        } catch (e) {
            console.log('Error in OrderService, deleteOrder ', e)
        }
    }
}
