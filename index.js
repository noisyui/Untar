let decompress = require('decompress');

let untar = async (tarFileName) => {
    let tarBuffer = await decompress(tarFileName, 'output');
    return tarBuffer;
};

let tarBuffer =  untar('RAP2.TAR');
// let tarBuffer =  untar('RAP2COPY.TAR');
