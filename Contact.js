import * as React from 'react';
import { View } from 'react-native';
import { Header, Text, Image, Button, Input } from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";

import { API_URL } from '@env';

function Contact() {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        // var base_url = "https://script.google.com/macros/s/{deploy_id}/exec";
        var base_url = API_URL;

        fetch(base_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`email=${data.email}&content=${data.content}`)
        })
            .then(function (response) {
                //リダイレクト先のテキストが戻るのを待つ
                response.text()
                    .then((text) => {
                        alert(text);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch(function (error) {
                alert("エラーが発生しました。");
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                centerComponent={{ text: "Contact", style: { color: "#fff", fontWeight: "bold" } }}
                containerStyle={{ backgroundColor: "#999" }}
            />
            <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
                <Text h3 style={{ marginVertical: 30 }}>Contact</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Email"
                            style={{ backgroundColor: "#ddd", padding: 10 }}
                            labelStyle={{ marginVertical: 10 }}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            errorMessage={errors.email && "Emailは必須です。"}
                            autoCapitalize="none"
                        />
                    )}
                    name="email"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="お問合せ内容"
                            multiline={true}
                            numberOfLines={4}
                            maxLength={100}
                            style={{ height: 100, backgroundColor: "#ddd", padding: 10 }}
                            labelStyle={{ marginVertical: 10 }}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            errorMessage={errors.email && "お問合せ内容は必須です。"}
                            autoCapitalize="none"
                        />
                    )}
                    name="content"
                    rules={{ required: true }}
                    defaultValue=""
                />
                <Button
                    title="送信"
                    buttonStyle={{ width: 200, height: 50 }}
                    style={{ marginTop: 20 }}
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View >
    );
}

export default Contact;