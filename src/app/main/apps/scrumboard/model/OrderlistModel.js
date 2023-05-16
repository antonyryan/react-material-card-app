import {FuseUtils} from '@fuse';

class OrderlistModel {
    constructor(data)
    {
        const item = data ? data : {};

        this.id = item.id || FuseUtils.generateGUID();
        this.orderItems = item.orderItems || [];
    }
}

export default OrderlistModel;
