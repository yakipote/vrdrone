'use strict';

const noble = require('noble');
const MINIDRONES_IDENTIFER = ['Maclan_','Mambo_','RS_']; //対応機種によって増えていく
let counter = 0;

//ParrotのMinidroneを見つける
const findParrotDrone = (localName) => {
    if(localName === undefined)return false;
    for(let i = 0, len = MINIDRONES_IDENTIFER.length; i < 10; i++){
        if(localName.indexOf(MINIDRONES_IDENTIFER[i]) === 0){
            return true;
        }
    }
    return false;
}

//周辺のBLE機器を検索
const startScan = () => {
    noble.startScanning();
    noble.on('discover', (peripheral) => {
        counter++;
        let mes = '';
        if (!('localName' in peripheral.advertisement)) return; //localNameがあるか判断
        if(findParrotDrone(peripheral.advertisement.localName)) mes += `発見→`; //localNameでParrotのデバイスを検索
        mes += `${counter}台目: ${peripheral.advertisement.localName} | ${peripheral.uuid} | RSSI ${peripheral.rssi}`;
        console.log(mes);
    });
}

if (noble.state === 'poweredOn') {
    startScan();
} else {
    noble.on('stateChange', startScan);
}
