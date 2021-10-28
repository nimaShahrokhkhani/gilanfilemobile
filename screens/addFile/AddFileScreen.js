import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import {TextInput, Button, Appbar} from 'react-native-paper';
import * as userActions from "../../utils/redux/actions/userLogin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Picker} from '@react-native-picker/picker';
import CustomDatePicker from "../components/CustomDatePicker";
import BaseScreen from "../base/BaseScreen";

class AddFileScreen extends Component {
    render() {
        let initialValues = {
            owner: '',
            telephone: '',
            address: '',
            date: '',
            sale: '',
            type: '',
            age: '',
            direction: '',
            unitPrice: '',
            totalPrice: '',
            rent: '',
            mortgage: '',
            comment: '',
            pool: '',
            jakozi: '',
            sona: '',
            regionCode: '',
            regionName: '',
            unitNo: '',
            documentKind: '',
            area: '',
            unitParking: '',
            unitAnbari: '',
        };
        return (
            <BaseScreen navigation={this.props.navigation} title={'افزودن فایل'}>
                <View style={{
                    flex: 1
                }}>
                    <KeyboardAvoidingView behavior={'padding'} enabled={true}
                                          style={{
                                              flex: 1
                                          }}>
                        <ScrollView style={{marginTop: 20, paddingHorizontal: 20}}>
                            <View style={{flex: 1}}>
                                <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
                                    {({handleChange, handleBlur, handleSubmit, values}) => (
                                        <View>
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('owner')}
                                                onBlur={handleBlur('owner')}
                                                value={values.owner}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="تلفن"
                                                onChangeText={handleChange('telephone')}
                                                onBlur={handleBlur('telephone')}
                                                value={values.telephone}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="آدرس"
                                                onChangeText={handleChange('address')}
                                                onBlur={handleBlur('address')}
                                                value={values.address}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <CustomDatePicker
                                                currentDate={new Date().setMonth(new Date().getMonth() - 1)}
                                                value={values.date}
                                                onChangeText={handleChange('date')}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('sale')}
                                                onBlur={handleBlur('sale')}
                                                value={values.sale}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('type')}
                                                onBlur={handleBlur('type')}
                                                value={values.type}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('age')}
                                                onBlur={handleBlur('age')}
                                                value={values.age}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('direction')}
                                                onBlur={handleBlur('direction')}
                                                value={values.direction}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('unitPrice')}
                                                onBlur={handleBlur('unitPrice')}
                                                value={values.unitPrice}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('totalPrice')}
                                                onBlur={handleBlur('totalPrice')}
                                                value={values.totalPrice}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('rent')}
                                                onBlur={handleBlur('rent')}
                                                value={values.rent}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('mortgage')}
                                                onBlur={handleBlur('mortgage')}
                                                value={values.mortgage}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('comment')}
                                                onBlur={handleBlur('comment')}
                                                value={values.comment}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('pool')}
                                                onBlur={handleBlur('pool')}
                                                value={values.pool}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('jakozi')}
                                                onBlur={handleBlur('jakozi')}
                                                value={values.jakozi}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('sona')}
                                                onBlur={handleBlur('sona')}
                                                value={values.sona}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('regionCode')}
                                                onBlur={handleBlur('regionCode')}
                                                value={values.regionCode}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('regionName')}
                                                onBlur={handleBlur('regionName')}
                                                value={values.regionName}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('unitNo')}
                                                onBlur={handleBlur('unitNo')}
                                                value={values.unitNo}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('documentKind')}
                                                onBlur={handleBlur('documentKind')}
                                                value={values.documentKind}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('area')}
                                                onBlur={handleBlur('area')}
                                                value={values.area}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="نام مالک"
                                                onChangeText={handleChange('unitParking')}
                                                onBlur={handleBlur('unitParking')}
                                                value={values.unitParking}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <TextInput
                                                label="انباری"
                                                onChangeText={handleChange('unitAnbari')}
                                                onBlur={handleBlur('unitAnbari')}
                                                value={values.unitAnbari}
                                                style={{
                                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                                    direction: 'rtl',
                                                    textAlign: 'right'
                                                }}
                                            />
                                            <Button style={{marginTop: 20}}
                                                    labelStyle={{fontFamily: 'IRANSansMobileFaNum-Light', fontSize: 18}}
                                                    mode="contained"
                                                    onPress={handleSubmit}>
                                                ثبت
                                            </Button>
                                        </View>
                                    )}
                                </Formik>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
    user: state.user.user,
});

const ActionCreators = Object.assign(
    {},
    userActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFileScreen)
