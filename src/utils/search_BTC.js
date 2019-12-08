function search_BTC(net, input, props) {
    // console.log(props, 'props....')
    input = ("" + input).replace(/(^\s*)|(\s*$)/g, "");
    let re = /^[0-9]*$/;
    if (re.test(input)) {
        // console.log(input * 1, 'height')
        if (net == "mainnet") {
            props.history.push('/app/BTC_block/' + input * 1)
        } else {
            props.history.push('/app/tBTC_block/' + input * 1)
        }
    } else if (input.length == 64) {
        // console.log(input, 'hash')
        if (input.substring(0, 8) == "00000000") {
            if (net == "mainnet") {
                props.history.push('/app/BTC_block/' + input)
            } else {
                props.history.push('/app/tBTC_block/' + input)
            }
        } else {
            if (net == "mainnet") {
                props.history.push('/app/BTC_transaction/' + input)
            } else {
                props.history.push('/app/tBTC_transaction/' + input)
            }
        }
    } else {
        if (net == "mainnet") {
            props.history.push('/app/BTC_address/' + input)
        } else {
            props.history.push('/app/tBTC_address/' + input)
        }
    }
}
export default search_BTC;
