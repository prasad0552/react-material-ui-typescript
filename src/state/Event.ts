import { Model } from "./Helpers";
import { IDbEntity } from "./DbEntity";
import { isNotSet } from "../helpers/misc";
import { User } from "./User";
import { Map } from 'immutable';

export interface IEvent extends IDbEntity {
    id: string;
    title?: string;
    description?: string;
    price?: number
    closed?: boolean;
    location?: string;
    date?: Date;
    photo?: string;
    createdBy?: User;
    attendancy?: Map<string, User>;
}

const EventModel = Model<IEvent>({
    id: null,
    title: null,
    description: null,
    closed: false,
    location: null,
    price: 0,
    photo: 'https://firebasestorage.googleapis.com/v0/b/tomahawk-da413.appspot.com/o/app%2Fmonyakeng.jpg?alt=media&token=fe716745-fe38-4ded-85b2-3514cc60679a',
    date: new Date(),
    createdBy: null,
    attendancy: Map<string, User>()
});

export class Event extends EventModel implements IEvent {
    public static ID = 'id';
    public static TITLE = 'title';
    public static DESCRIPTION = 'description';
    public static PRICE = 'price';
    public static CLOSED = 'closed';
    public static DATE = 'date';
    public static PHOTO = "photo";
    public static LOCATION = 'location';

    public id: string;
    public title: string;
    public description: string;
    public price: number
    public closed: boolean;
    public photo: string;
    public location: string;
    public date: Date;
    public createdBy: User;
    public attendancy: Map<string, User>;

    public toSaveable() {
        const data = this.toJS();
        delete data.id;
        delete data.createdBy;
        delete data.attendancy;
        return data;
    }

    public get valid(): boolean {
        return !isNotSet(this.title) &&
        !isNotSet(this.description) &&
        !isNotSet(this.location) &&
        !isNotSet(this.date);
    }

    public isUserGoing(id: string): boolean {
        return this.attendancy.has(id);
    }
}