
import {FuseUtils} from '@fuse';

class OrderlistItemModel {
    constructor(data)
    {
        const item = data ? data : {};

        this.id = item.id || FuseUtils.generateGUID();
        this.code = item.code || '';
        this.name = item.name || '';
        this.qty = item.qty || '';
        this.price = item.price || '';
        this.checked = item.checked || false;
    }
}

export default OrderlistItemModel;
