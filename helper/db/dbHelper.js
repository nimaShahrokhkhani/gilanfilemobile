import Realm from "realm";
import {Component} from "react";
import _ from "underscore";


export default class dbHelper extends Component {

    constructor(props) {
        super(props);

        this.realm = undefined;
        Realm.open({
            path: "realstate",
            schema: [props.schema],
        }).then(realm => {
            this.realm = realm;
        });
    }

    getPrimaryKeyId(model) {
        if (myRealm .objects(model).max("id")) {
            return myRealm.objects(model).max("id") + 1;
        }
        return 1;
    }

    static async insert(schema, collection, data, onSuccess, onFailure) {
        const realm = await Realm.open({
            path: "realstate",
            schema: [schema],
        });
        realm.write(() => {

            if (realm.objects(collection).max("_id")) {
                data._id =  realm.objects(collection).max("_id") + 1;
            } else {
                data._id =  1;
            }

            realm.create(collection, data);
            onSuccess && onSuccess();
        });
    }

    static async update(schema, collection, filter, newData, onSuccess, onFailure) {
        const realm = await Realm.open({
            path: "realstate",
            schema: [schema],
        });
        let finalFile;
        realm.write(() => {
            finalFile = realm.objects(collection).filtered(filter)[0];
            finalFile.owner = newData.owner;
            finalFile.tel1 = newData.tel1;
            finalFile.address = newData.address;
            finalFile.date = newData.date ? parseInt(newData.date) : '';
            finalFile.sale = newData.sale;
            finalFile.type = newData.type;
            finalFile.unitPrice = newData.unitPrice;
            finalFile.totalPrice = newData.totalPrice;
            finalFile.rent = newData.rent;
            finalFile.mortgage = newData.mortgage;
            finalFile.regionCode = newData.regionCode;
            finalFile.regionName = newData.regionName;
            finalFile.unitNo = newData.unitNo;
            finalFile.age = newData.age;
            finalFile.direction = newData.direction;
            finalFile.comment = newData.comment;
            finalFile.pool = newData.pool;
            finalFile.jakozi = newData.jakozi;
            finalFile.sona = newData.sona;
            finalFile.documentKind = newData.documentKind;
            finalFile.area = newData.area;
            finalFile.unitParking = newData.unitParking;
            finalFile.unitAnbari = newData.unitAnbari;
            finalFile.equipments = newData.equipmentList;
            finalFile.marker = newData.marker;
            finalFile.imageUrl = newData.imageUrl;
            onSuccess && onSuccess();
        });
    }

    static async delete(schema, collection, data, onSuccess, onFailure) {
        const realm = await Realm.open({
            path: "realstate",
            schema: [schema],
        });
        realm.write(() => {

            realm.delete(realm.objects(collection).filtered("Id == '" + data.Id + "'"));

            onSuccess && onSuccess();
        });
    }

    static async deleteInnerFile(schema, collection, data, onSuccess, onFailure) {
        const realm = await Realm.open({
            path: "realstate",
            schema: [schema],
        });
        realm.write(() => {

            realm.delete(realm.objects(collection).filtered("_id == '" + data._id + "'"));

            onSuccess && onSuccess();
        });
    }

    static async find(schema, collection, filter) {
        const realm = await Realm.open({
            path: "realstate",
            schema: [schema],
        });
        if (!_.isEmpty(filter)) {
            return realm.objects(collection).sorted('_id', true).filtered(filter);
        } else {
            return realm.objects(collection).sorted('_id', true);
        }
    }

    static async findLastRecord(schema, collection, filter) {
        const realm = await Realm.open({
            path: "realstate",
            schema: [schema],
        });
        return realm.objects(collection).sorted('_id', true).limit(1);
    }

}
