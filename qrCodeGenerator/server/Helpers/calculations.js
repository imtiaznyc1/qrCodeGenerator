import { NUMERIC_REGEX,  ALPHA_REGEX, BYTE_REGEX, KANJI_REGEX, LENGTH_BITS} from "../consts.js"


export function getEncodingMode(input){
    if(NUMERIC_REGEX.test(input)){
        console.log('Numeric mode has been chosen \n')
        return 0b0001
    }else if(ALPHA_REGEX.test(input)){
        console.log('Alphanumeric mode has been chosen \n')
        return 0b0010
    }else if(BYTE_REGEX.test(input)){
        console.log('Byte mode has been chosen \n')
        return 0b0100
    }else if(KANJI_REGEX.test(input)){
        console.log('Kanji mode has been chosen \n')
        return 0b1000
    }else{
        console.log('ECI mode has been chosen \n')
        return 0b0111
    }
}


export function getLengthBits(mode, version){
    const modeI = 31 - Math.clz32(mode)
    const bitsI = version > 26 ? 2 : version > 9 ? 1 : 0
    return LENGTH_BITS[modeI][bitsI]
}

export function formatBinary(input, bits){
    if(input.length < bits){
       return input = '0'.repeat(bits - input.length) + input
    }else{
        console.log('there is equal amount/more bits in input than specified bit limit of: ' + bits.toString())
        return input
    }
}

export function finalDataBits(input){
    let binaryString = formatBinary(intToBinary(getEncodingMode(input)), 4)
    let encodingBitSize = getLengthBits(getEncodingMode(input), 2)
    let inputSizeInBinary = intToBinary(input.length)
    binaryString += inputSizeInBinary + ' '
    for(var i = 0; i < input.length; i++){
        console.log(intToBinary(input[i].charCodeAt()))
        binaryString+=intToBinary(input[i].charCodeAt())
    }
    console.log(binaryString)
}

export function intToBinary(number){
    return (number >>> 0).toString(2)
}

finalDataBits('https://www.qrcode.com/')