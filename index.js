// const express = require('express');
// const crypto = require('crypto');
import express from 'express'
import crypto from 'crypto'

const app = express();
const port = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    const {
        orgTitleMessage,
        orgFirstNameMessage,
        orgLastNameMessage,
        orgTitleEnglishMessage,
        orgFirstNameEnglishMessage,
        orgLastNameEnglishMessage,
        orgUserNameMessage,
        orgCIFMessage,
        orgMobileTelMessage,
        orgEmailMessage,
        orgBirthdateMessage,
        orgIDNumberMessage,
        orgGenderMessage,
        orgLocationMessage,
        orgDeviceIDMessage,
        publicKeyString,
    } = req.body;

    const publicKey = Buffer.from(publicKeyString, 'base64');

    const encryptData = (message) =>
        crypto
            .publicEncrypt(
                {
                    key: publicKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                Buffer.from(message)
            )
            .toString('base64');

    const encryptedData = {
        encryptedTitle: encryptData(orgTitleMessage),
        encryptedFirstName: encryptData(orgFirstNameMessage),
        encryptedLastName: encryptData(orgLastNameMessage),
        encryptedTitleEnglish: encryptData(orgTitleEnglishMessage),
        encryptedFirstNameEnglish: encryptData(orgFirstNameEnglishMessage),
        encryptedLastNameEnglish: encryptData(orgLastNameEnglishMessage),
        encryptedUserName: encryptData(orgUserNameMessage),
        encryptedCIF: encryptData(orgCIFMessage),
        encryptedMobileTel: encryptData(orgMobileTelMessage),
        encryptedEmail: encryptData(orgEmailMessage),
        encryptedBirthdate: encryptData(orgBirthdateMessage),
        encryptedIDNumber: encryptData(orgIDNumberMessage),
        encryptedGender: encryptData(orgGenderMessage),
        encryptedLocation: encryptData(orgLocationMessage),
        encryptedDeviceID: encryptData(orgDeviceIDMessage),
    };

    res.json(encryptedData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
