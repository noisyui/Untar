let decompress = require('decompress');
let tar = require('tar');
let fs = require('fs');
let Buffer = require('buffer').Buffer;

let untar = async (tarFileName) => {
    let buffer = Buffer.alloc(512);
    let fd = fs.openSync(tarFileName, 'r');
    fs.readSync(fd, buffer, 0, 512, 0);

    addMagicIfPrePOSIXTar(buffer);

    fs.writeSync(fd, buffer, 0, 512, 0);

    let tarBuffer = await decompress(tarFileName, 'output');
    return tarBuffer;
};

let addMagicIfPrePOSIXTar = (buffer) => {
    let header = new tar.Header(buffer);
    if (header.cksumValid) {
        buffer.writeUInt8(0x75 ,257);
        buffer.writeUInt8(0x73 ,258);
        buffer.writeUInt8(0x74 ,259);
        buffer.writeUInt8(0x61 ,260);
        buffer.writeUInt8(0x72 ,261);
    }
};

let tarBuffer =  untar('RAP2.TAR');
// let tarBuffer =  untar('RAP2COPY.TAR');
