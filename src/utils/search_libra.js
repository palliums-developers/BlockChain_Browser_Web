function search_libra(input, props) {
    // console.log(props, 'props....')
    input = ("" + input).replace(/(^\s*)|(\s*$)/g, "");
    let re = /^[0-9]*$/;
    if (re.test(input)) {
        // console.log(input * 1, 'height')
        props.history.push('/app/Libra_dealbox/' + input * 1)
    } else if (input.length === 32) {
        // console.log(input, 'hash')
        props.history.push('/app/Libra_addressBox/' + input)
    }
    // console.log(input.length)
}

export default search_libra;
