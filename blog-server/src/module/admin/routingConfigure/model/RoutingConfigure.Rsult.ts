import {RoutingConfigure} from "../../../../db/entities/RoutingConfigure";

export class RoutingConfigureFindRsutl extends RoutingConfigure {
    children? : Array<RoutingConfigure>

    constructor(Routing: RoutingConfigure,  Children: Array<RoutingConfigure> = []) {
        super();
        Object.assign(this, Routing);
        this.children = Children
    }
}